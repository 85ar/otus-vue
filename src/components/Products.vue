<template>
  <div>
    <p class="title">Product list</p>
    <div v-if="loading">
      <Spinner />
    </div>
    <div class="products" v-else-if="filteredProducts.length > 0">
      <ProductItem
        v-for="product in filteredProducts"
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
import { ref, onMounted, watch } from "vue";

const shopStore = useShopStore();
const loading = ref(true);
const filteredProducts = ref([]);

onMounted(async () => {
  // проверяю есть ли продукты в сторе. Если есть, гружу сразу в компонент. Если нет - запрос в апи.
  if (!shopStore.productsLoaded) {
    await shopStore.fetchProducts();
  }
  updateProducts();
  loading.value = false;
});

const updateProducts = () => {
  filteredProducts.value = searchProductHandler(shopStore.searchProduct);
};
const searchProductHandler = (search) => {
  return shopStore.products.filter((product) => {
    const searchLower = search.toLowerCase();
    const titleMatch = product.title.toLowerCase().includes(searchLower);
    const priceMatch = String(product.price).includes(searchLower);
    return titleMatch || priceMatch;
  });
};

// следим за строкой поиска и запускаем фильтрацию если надо
watch(() => shopStore.searchProduct, updateProducts);
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
