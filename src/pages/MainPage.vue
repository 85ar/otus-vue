<template>
  <div>
    <p class="title">Product list</p>
    <div v-if="loading">
      <Spinner />
    </div>
    <Products :products="filteredProducts" v-else-if="filteredProducts.length !== 0" @orderFinallyEmit="orderFinallyEmit" />
    <div v-else class="message">Not founded</div>
  </div>
</template>

<script setup>
import { getData } from "../services/getData";
import Products from "./../components/Products.vue";
import Spinner from "../components/Spinner.vue";
import { onMounted, ref, watch, watchEffect } from "vue";

const products = ref([]);
const loading = ref(true);
const orders = ref([]);
const emit = defineEmits();


const props = defineProps({
  searchProduct: {
    type: String,
  },
  deleteOrders: {
    type: Array,
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
const deleteOrder = () => {
  orders.value = orders.value.filter((item) => !props.deleteOrders.some(deleteItem => deleteItem.id === item.id));
  emit("ordersEmit", orders.value);
  console.log('delete Main');
};

// следим за строкой поиска и запускаем фильтрацию если надо
watch(() => props.searchProduct, updateProducts);

// следим за удалением товаров из корзины
watch(() => props.deleteOrders, deleteOrder);


// ищем товар
const searchProductHandler = (search) => {
  return products.value.filter((product) => {
    const searchLower = search.toLowerCase();
    const titleMatch = product.title.toLowerCase().includes(searchLower);
    const priceMatch = String(product.price).includes(searchLower);
    return titleMatch || priceMatch;
  });
};

// const addProductEmit = (data) => {
//   console.log("data", data);
//   console.log(" filteredProducts.value", filteredProducts.value);
//   filteredProducts.value = filteredProducts.value.push(data);
// };

const orderFinallyEmit = (data) => {
  orders.value = data;
  emit("ordersEmit", orders.value);
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
