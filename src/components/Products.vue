<template>
  <div>
    <div class="flex items-center justify-between flex-wrap">
      <ProductItem
        :product="product"
        v-for="product in products"
        :key="product.id"
        class="w-52 p-3"
        v-if="products"
      />
      <div class="m-auto" v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import Spinner from "./Spinner.vue";

defineProps(["products"]);
</script>

<style lang="scss" scoped></style>
