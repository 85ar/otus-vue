<template>
  <div>
    <div>Список товаров</div>
    <div v-if="loading">
      <Spinner />
    </div>
    <Products :products="products" v-else />
  </div>
</template>

<script setup>
import { getData } from "../services/getData";
import Products from "./../components/Products.vue";
import Spinner from "../components/Spinner.vue";
import { onMounted, ref } from "vue";

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    products.value = await getData();
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
