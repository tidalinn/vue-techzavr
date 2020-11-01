<template>
  <router-link class="header__cart" :to="{name: 'baskets'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>

    <span class="header__count" aria-label="Количество товаров">
      {{ totalAmount }}
      <div class="load__mini" v-if="cartLoading">
        <hr/><hr/><hr/><hr/>
      </div>
    </span>

  </router-link>
</template>

<script>
import '@/assets/css/preloader.css';

import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      cartLoading: true,
      loadProductsTimer: null,
    };
  },
  computed: {
    ...mapGetters({
      totalAmount: 'cartTotalAmount',
    }),
  },
  methods: {
    ...mapActions(['loadCart']),

    loadProductsInCart() {
      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        this.cartLoading = true;

        this.loadCart()
          .catch(() => {
            this.cartLoading = false;
          })
          .then(() => {
            this.cartLoading = false;
          });
      }, 500);
    },
  },
  created() {
    this.loadProductsInCart();
  },
};
</script>