<template>
  <div>
    <ShoppingCart
      :orders="orders"
      v-if="orders.length !== 0"
      @removeOrderEmit="removeOrderEmit"
    />
    <div>
      <p class="title">Product list</p>
      <div v-if="loading">
        <Spinner />
      </div>
      <Products
        @orderFinallyEmit="orderFinallyEmitValue"
        :products="filteredProducts"
        v-else-if="filteredProducts.length !== 0"
        :deleteOrder="deleteOrder"
      />
      <div v-else class="message">Not founded</div>
    </div>
  </div>
</template>

<script setup>
import { getData } from "../services/getData";
import Products from "./../components/Products.vue";
import Spinner from "../components/Spinner.vue";
import { onMounted, ref, watch } from "vue";
import ShoppingCart from "./ShoppingCart.vue";

const products = ref([]);
const loading = ref(true);
const orders = ref([]);
const deleteOrder = ref();
const emit = defineEmits();
const props = defineProps({
  searchProduct: {
    type: String,
  },
});

const removeOrderEmit = (data) => {
  deleteOrder.value = data;
};

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
    const searchLower = search.toLowerCase();
    const titleMatch = product.title.toLowerCase().includes(searchLower);
    const priceMatch = String(product.price).includes(searchLower);
    return titleMatch || priceMatch;
  });
};

const orderFinallyEmitValue = (data) => {
  orders.value = data;
  emit("ordersCount", data.length);
};
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
.message {
  display: flex;
  justify-content: center;
}
</style>
