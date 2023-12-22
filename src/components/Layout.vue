<template>
  <div class="layout">
    <Header
      @searchProductEmit="searchProductEmit"
      :orderCounts="orderCounts"
    ></Header>
    <main class="content">
      <slot :searchProduct="searchProduct" ></slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { ref } from "vue";

const searchProduct = ref("");

const props = defineProps(['orderCounts']);

const searchProductEmit = (data) => {
  searchProduct.value = data;
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
