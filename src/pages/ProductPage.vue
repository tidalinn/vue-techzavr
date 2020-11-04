<template>
  <main class="content container" :class="{'container__minheight': productLoading === true || productLoadingFailed === true}">
    
    <div v-if="productLoading">
      <h4 class="product__status product__loading">Идёт загрузка товара...</h4>
      <div class="load">
        <hr/><hr/><hr/><hr/>
      </div>
    </div>
    <div class="product__status product__failed" v-else-if="productLoadingFailed">
      <h4>Произошла ошибка при загрузке товаров</h4>
      <button @click.prevent="loadProduct">Попробовать ещё раз</button>
    </div>

    <div class="content__product" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">{{  }}</router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">{{ product.title }}</a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="300" :src="product.image.file.url" :alt="product.title">
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <b class="item__price">{{ product.price | numberFormat }} ₽</b>

              <!-- Colors -->
              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <BaseColors :colors="product.colors" :selected-color.sync="colorFromChildConponent" />
              </fieldset>

              <div class="item__row">
                <BaseAddReduceAmount v-model.number="productAmount" :amount.sync="productAmount" />
                <button class="button button--primery" type="submit" :disabled="productAddSending">В корзину</button>
              </div>
              <div class="product__status--add" v-show="productAdded">Товар добавлен в корзину</div>
              <div class="product__status--add" v-show="productAddSending">Добавление товара в корзину...</div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">Описание</a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">Характеристики</a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">Гарантия</a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">Оплата и доставка</a>
            </li>
          </ul>

          <div class="item__content">
            <p>{{ product.content }}</p>
            
            <!-- <a href="#">Все характеристики</a>

            <div class="item__details">
              <p>Автор: <span>{{ product.author }}</span></p>
              <p>Обложка: <span>{{ product.cover }}</span></p>
              <p>Издательство: <span>{{ product.publisher }}</span></p>
              <p>Количество страниц: <span>{{ product.pages }}</span></p>
              <p>Год издания: <span>{{ product.year }} год</span></p>
            </div> -->
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import '@/assets/css/preloader.css';

import BaseColors from '@/components/base/BaseColors.vue';
import BaseAddReduceAmount from '@/components/base/BaseAddReduceAmount.vue';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      colorFromChildConponent: null,
      productAmount: 1,
      productData: null,
      productLoading: true,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  components: { BaseColors, BaseAddReduceAmount },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData
        ? this.productData.items.find((product) => product.id === +this.$route.params.id)
        : [];
    },
    /* category is not returned from the server
    category() {
      return this.productData.category;
    }, */
  },
  methods: {
    ...mapActions(['addProductToCart']),

    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/`, {
          params: {
            id: +this.$route.params.id,
          },
        })
          /* eslint-disable */
          .then((response) => {
            this.productData = response.data;
            
            if (this.product === undefined) {
              this.$router.push({ name: 'notFound' });
            }
          })
          .catch(() => {
            this.productLoading - false;
            this.productLoadingFailed = true;
          })
          .then(() => this.productLoading = false);
      }, 0);
    },
    getColor(color) {
      this.colorFromChildConponent = color;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    }
  }
};
</script>

<style lang="css" scoped>
  .form__counter svg {
    width: 12px;
    height: 12px;
  }
</style>