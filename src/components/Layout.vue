<template>
  <div class="layout">
    <Header
      @searchProductEmit="searchProductEmit"
      :orderCounts="orderCounts"
      @openShoppingCart="openShoppingCart"
      @openAddNewProduct="openAddNewProduct"
    ></Header>
    <main class="content">
      <slot

      ></slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { ref } from "vue";

const searchProduct = ref("");
const orderCounts = ref();
const openCart = ref();
const openNewProduct = ref();

const ordersCountValue = (data) => {
  orderCounts.value = data;
};
const searchProductEmit = (data) => {
  searchProduct.value = data;
};

const openShoppingCart = (data) => {
  openCart.value = data;
};
const openAddNewProduct = (data) => {
  openNewProduct.value = data;
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>
