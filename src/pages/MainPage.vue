<template>
  <div>
    <h1>Список товаров</h1>
    <Products :products="products" flex/>
  </div>
</template>

<script setup>
import products from "./../services/products";
import Products from "./../components/Products.vue";

</script>

<style lang="scss" scoped></style>
