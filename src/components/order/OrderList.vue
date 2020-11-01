<template>
  <div class="cart__details">
    <div v-if="productsLoading">
      <h4 class="catalog__status catalog__loading">Идёт загрузка корзины...</h4>
      <div class="load">
        <hr/><hr/><hr/><hr/>
      </div>
    </div>
    <div class="catalog__status catalog__failed" v-else-if="productsLoadingFailed">
      <h4>Произошла ошибка при загрузке корзины</h4>
      <button @click.prevent="loadProducts">Попробовать ещё раз</button>
    </div>

    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.id" :item="item">
        <h3>{{ item.product.title }}</h3>
        <b v-if="item.amount">{{ (item.product.price * item.amount) | numberFormat }} ₽</b>
        <b v-else-if="item.quantity">{{ (item.product.price * item.quantity) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalAmount }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['products', 'totalAmount', 'totalPrice', 'productsLoading', 'productsLoadingFailed', 'loadProducts'],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { 
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
};
</script>