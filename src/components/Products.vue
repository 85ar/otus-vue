<template>
  <div class="products">
    <ProductItem
      :product="product"
      v-for="product in props.products"
      :key="product.id"
    />
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";

const props = defineProps({
  products: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
