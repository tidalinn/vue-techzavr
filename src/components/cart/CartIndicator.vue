<template>
  <router-link class="header__cart" :to="{name: 'baskets'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>

    <span class="header__count" aria-label="Количество товаров">
      {{ totalAmount }}
      <div class="load__mini" v-if="totalAmount === 0 && $store.state.userAccessKey !== null">
        <hr/><hr/><hr/><hr/>
      </div>
    </span>

  </router-link>
</template>

<script>
import '@/assets/css/preloader.css';

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      totalAmount: 'cartTotalAmount',
    }),
  },
};
</script>