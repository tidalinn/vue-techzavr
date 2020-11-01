<template>
  <div class="form__counter">
    <button class="delete__item" type="button" aria-label="Убрать один товар"
            :class="{'button__link--disabled' : amount < 2}" @click.prevent="changeAmount(amount-1)">
      <svg :width="width" :height="width" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count">

    <button class="add__item" type="button" aria-label="Добавить один товар">
      <svg :width="width" :height="width" fill="currentColor" @click.prevent="changeAmount(amount+1)">
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
  props: ['amount', 'width'],
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