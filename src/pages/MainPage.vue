<template>
  <div>
    <span class="title">Product list</span>

    <div v-if="loading">
      <Spinner />
    </div>
    <Products
      :products="filteredProducts"
      v-else-if="filteredProducts.length !== 0"
    />
    <div v-else class="message">Not founded</div>
  </div>
</template>

<script setup>
import { getData } from "../services/getData";
import Products from "./../components/Products.vue";
import Spinner from "../components/Spinner.vue";
import { onMounted, ref, watch } from "vue";

const products = ref([]);
const loading = ref(true);

const props = defineProps({
  searchProduct: {
    type: String,
  },
});

const filteredProducts = ref([]);

onMounted(async () => {
  try {
    products.value = await getData();
    updateProducts();
  } finally {
    loading.value = false;
  }
});

const updateProducts = () => {
  filteredProducts.value = searchProductHandler(props.searchProduct);
};

// следим за строкой поиска и запускаем фильтрацию если надо
watch(() => props.searchProduct, updateProducts);

// ищем товар
const searchProductHandler = (search) => {
  return products.value.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid $accent;
  margin-left: 20px;
}
.message {
  display: flex;
  justify-content: center;
}
</style>
