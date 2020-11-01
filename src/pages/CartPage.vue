<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ totalAmount }} {{ totalAmount | wordDecline(['товар', 'товара', 'товаров']) }}</span>
    </div>
    
    <div v-if="cartLoading">
      <h4 class="product__status product__loading">Идёт загрузка корзины...</h4>
      <div class="load">
        <hr/><hr/><hr/><hr/>
      </div>
    </div>
    <div class="product__status product__failed" v-else-if="cartLoadingFailed">
      <h4>Произошла ошибка при загрузке корзины</h4>
      <button @click.prevent="loadProduct">Попробовать ещё раз</button>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">Итого: <span>{{ totalPrice | numberFormat }} ₽</span></p>

          <router-link tag="button" class="cart__button button button--primery" 
                       v-if="totalAmount !== 0" :to="{name: 'orders'}" type="submit">Оформить заказ</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import wordDecline from '@/helpers/wordDecline';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      cartLoading: true,
      cartLoadingFailed: false,
    };
  },
  components: { CartItem },
  filters: { numberFormat, wordDecline },
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
      this.cartLoading = true;
      this.cartLoadingFailed = false;

      this.loadCart()
        .catch(() => {
          this.cartLoading = false;
          this.cartLoadingFailed = true;
        })
        .then(() => {
          this.cartLoading = false;
        });
    },
  },
  created() {
    this.loadProductsInCart();
  },
};
</script>