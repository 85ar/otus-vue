<template>
  <div>
    <div class="text-base text-center m-3">Список товаров</div>
    <button
      @click="showProducts()"
      class="py-2 px-4 rounded btn bg-blue-500 text-white"
    >
      {{ !isShowProduct ? "Показать товары" : "Скрыть товары" }}
    </button>
    <Products :products="products" v-if="isShowProduct" />
  </div>
</template>

<script setup>
import products from "./../services/products";
import Products from "./../components/Products.vue";
import { ref } from "vue";

const isShowProduct = ref(false);
const showProducts = () => {
  isShowProduct.value = !isShowProduct.value;
};
</script>

<style lang="scss" scoped></style>
