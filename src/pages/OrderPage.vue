<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'baskets'}">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ totalAmount }} {{ totalAmount | wordDecline(['товар', 'товара', 'товаров']) }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя" />
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес" />
            <BaseFormText v-model="formData.phone" :error="formError.phone" type="tel" title="Телефон" placeholder="Введите ваш телефон" />
            <BaseFormText v-model="formData.email" :error="formError.email" type="email" title="Email" placeholder="Введите ваш Email" />
            <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу" placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">Самовывоз <b>бесплатно</b></span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">Курьером <b>500 ₽</b></span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">Картой при получении</span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">Наличными при получении</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderList  v-bind.sync="orderData" />

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
        
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import '@/assets/css/preloader.css';

import OrderList from '@/components/order/OrderList.vue';
import BaseFormText from '@/components/base/BaseFormText.vue';
import BaseFormTextarea from '@/components/base/BaseFormTextarea.vue';
import wordDecline from '@/helpers/wordDecline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'OrderPage',
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      
      orderData: {
        products: {},
        totalAmount: 0,
        totalPrice: 0,
        productsLoading: true,
        productsLoadingFailed: false,
        loadProducts: null,
      },
    };
  },
  components: { OrderList, BaseFormText, BaseFormTextarea },
  filters: { wordDecline },
  computed: {
    ...mapGetters({ 
      products: 'cartDetailProduct', 
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
    }),
  },
  methods: {
    ...mapActions(['loadCart']),

    loadProductsInCart() {
      this.orderData.productsLoading = true;
      this.orderData.productsLoadingFailed = false;

      this.loadCart()
        .catch(() => {
          this.orderData.productsLoading = false;
          this.orderData.productsLoadingFailed = true;
        })
        .then(() => {
          this.orderData.productsLoading = false;
          this.orderData.products = this.products;
          this.orderData.totalAmount = this.totalAmount;
          this.orderData.totalPrice = this.totalPrice;
        });
    },
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
  created() {
    this.loadProductsInCart();
  },
};
</script>