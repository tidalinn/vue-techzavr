<template>
  <div class="form__counter">
    <button class="delete__item" type="button" aria-label="Убрать один товар"
            :class="{'button__link--disabled' : amount < 2}" @click.prevent="changeAmount(amount-1)">
      <svg width="10px" height="10px" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="property" name="count">

    <button class="add__item" type="button" aria-label="Добавить один товар">
      <svg width="10px" height="10px" fill="currentColor" @click.prevent="changeAmount(amount+1)">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'amount',
    event: 'amountAddReduce',
  },
  props: ['amount'],
  computed: {
    property: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },
  methods: {
    amountAddReduce(amount) {
      this.$emit('amountAddReduce', amount);
    },
    changeAmount(amount) {
      if (amount > 0) {
        this.amountAddReduce(amount);
      }
    },
  },
};
</script>