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

      <h1 class="content__title">Заказ оформлен <span>№ {{ orderInfo.id }}</span></h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">Получатель</span>
              <span class="dictionary__value">{{ orderInfo.name }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Адрес доставки</span>
              <span class="dictionary__value">{{ orderInfo.address }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">{{ orderInfo.phone }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Email</span>
              <span class="dictionary__value">{{ orderInfo.email }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Способ оплаты</span>
              <span class="dictionary__value">Картой при получении</span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderList v-bind.sync="orderData" />
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderList from '@/components/order/OrderList.vue';
import { mapActions } from 'vuex';

export default {
  name: 'OrderPageInfo',
  data() {
    return {
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
  components: { OrderList },
  methods: {
    ...mapActions(['loadOrderInfo']),

    loadOrder() {
      this.orderData.productsLoading = true;
      this.orderData.productsLoadingFailed = false;

      this.loadOrderInfo(this.$route.params.id)
        .catch(() => {
          this.orderData.productsLoading = false;
          this.orderData.productsLoadingFailed = true;
          this.$router.push({ path: '/404' });
        })
        .then(() => {
          this.orderData.productsLoading = false;
          this.orderData.productsLoadingFailed = false;
          this.orderData.products = this.orderInfo.basket.items;
          this.orderData.totalAmount = this.orderInfo.basket.items.length;
          this.orderData.totalPrice = this.orderInfo.totalPrice;
        });
    },
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrder();
        this.$store.dispatch('loadOrderInfo', this.$route.params.id);
      },
      immediate: true,
    },
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>