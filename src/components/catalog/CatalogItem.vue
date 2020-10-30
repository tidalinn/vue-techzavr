<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'products', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>
    <span class="catalog__price"> {{ product.price | numberFormat }} ₽</span>
    
    <BaseColors :class="{'colors--black': product.colors}" :colors="product.colors" 
                :selected-color.sync="colorFromChildConponent" />
  </li>
</template>

<script>
import BaseColors from '@/components/BaseColors.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      colorFromChildConponent: null,
    };
  },
  props: ['product'],
  components: { BaseColors },
  filters: { numberFormat },
  methods: {
    getColor(color) {
      this.colorFromChildConponent = color;
    },
    gotoPage,
  },
};
</script>