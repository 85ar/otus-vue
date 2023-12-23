<template>
  <div>
    <p class="title">Product list</p>
    <div v-if="loading">
      <Spinner />
    </div>
    <div class="products" v-else-if="products.length > 0">
      <ProductItem
        v-for="product in products"
        :product="product"
        :key="product.id"
      />
    </div>
    <div v-else class="message">Not founded</div>
  </div>
</template>

<script setup>
import { useShopStore } from "../store/shopStore";
import ProductItem from "./ProductItem.vue";
import Spinner from "./Spinner.vue";
import { ref, onMounted } from "vue";

const shopStore = useShopStore();

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  // проверяю есть ли продукты в сторе. Если есть, гружу сразу в компонент. Если нет - запрос в апи.
  if (!shopStore.productsLoaded) {
    await shopStore.fetchProducts();
  }
  products.value = shopStore.products;
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  margin-bottom: 10px;
  text-decoration: underline;
  text-decoration-color: $accent;
  text-underline-offset: 6px;
  margin-left: 20px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
