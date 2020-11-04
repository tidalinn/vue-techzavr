import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'products', component: ProductPage, path: '/products/:id' },
  { name: 'baskets', component: CartPage, path: '/baskets' },
  { name: 'orders', component: OrderPage, path: '/orders' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/orders/:id' },
  { name: 'notFound', component: NotFoundPage, path: '/404' },
// Vue3  { path: '/:catchAll(.*)', redirect: '/404' },
];

const router = new VueRouter({
  routes,
});

export default router;