<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }} {{ countProducts | wordDecline(['товар', 'товара', 'товаров']) }}</span>
    </div>
    <div class="content__catalog"> 
      <CatalogFilter v-bind.sync="filter" />
      <section class="catalog">
        
        <h4 class="catalog__status catalog__void" v-if="(countProducts === 0 && productsLoading === false && productsLoadingFailed === false)">Упс, здесь ничего нет</h4>
        <div v-else-if="productsLoading">
          <h4 class="catalog__status catalog__loading">Идёт загрузка каталога...</h4>
          <div class="load">
            <hr/><hr/><hr/><hr/>
          </div>
        </div>
        <div class="catalog__status catalog__failed" v-else-if="productsLoadingFailed">
          <h4>Произошла ошибка при загрузке товаров</h4>
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
        
        <CatalogList :catalog="products" />
        <BasePagination v-model="page" :page="page" :count="countProducts" :per-page="productsPerPage" />  
      </section>
    </div>
  </main>
</template>

<script>
import '@/assets/css/preloader.css';

import CatalogList from '@/components/catalog/CatalogList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import CatalogFilter from '@/components/catalog/CatalogFilter.vue';
import wordDecline from '@/helpers/wordDecline';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'MainPage',
  components: { CatalogList, BasePagination, CatalogFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: true,
      productsLoadingFailed: false,

      filter: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
      },
    };
  },
  filters: { wordDecline },
  computed: {
    products() {
      return this.productsData 
      /* eslint-disable */
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            image: product.image.file.url,
          };
        })
        : [];
    },
    /* filteredProducts() {
      let filteredCatalog = this.products;

      if (this.filterColorId !== 0) {
        filteredCatalog = filteredCatalog.filter((product) => product.colors.forEach(item => item.id === this.filterColorId));
      }
    }, */
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    filterPriceFrom() {
      return this.filter.priceFrom;
    },
    filterPriceTo() {
      return this.filter.priceTo;
    },
    filterCategoryId() {
      return this.filter.categoryId;
    },
    filterColorId() {
      return this.filter.colorId;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);
      
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filter.categoryId,
              minPrice: this.filter.priceFrom,
              maxPrice: this.filter.priceTo,
              colorId: this.filter.colorId,
            }
          })
            .then((response) => {
              this.productsData = response.data;
              this.productsData.items.filter((product) => {
                product.colors.forEach(item => item.id) === this.filter.colorId
              }); 
            })
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false);
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>