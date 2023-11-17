<template>
  <div>
    <div v-if="products" class="flex items-center justify-between flex-wrap">
      <ProductItem
        :product="product"
        v-for="product in products"
        :key="product.id"
        class="w-52 p-3"
      />
    </div>
    <div v-else>спиннер</div>
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";

defineProps(["products"]);
</script>

<style lang="scss" scoped></style>
