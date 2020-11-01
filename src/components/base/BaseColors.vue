<template>
  <ul class="colors" >
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label colors__label--catalog">
        <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="property">
        <span class="colors__value" :class="{'colors__value--selected': property}" 
                                    :style="{'background-color': color.code}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colors: Array,
    selectedColor: Number,
  },
  computed: {
    property: {
      get() {
        return this.selectedColor;
      },
      set(value) {
        this.$emit('update:selectedColor', value);
      },
    },
  },
};
</script>