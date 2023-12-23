import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useShopStore = defineStore("shopStore", () => {
  // state
  const products = ref([]);
  const productItem = ref({});
  const productsLoaded = ref(false);
  const isAuthValue = ref();
  const orders = ref([]);

  // actions
  // загрузка данных
  async function fetchProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      products.value = response.data;
      productsLoaded.value = true;
    } catch (error) {
      console.log("Ошибка загрузки данных", error);
      throw error;
    }
  }

  // загрузка детализации для одного товара по его ID
  async function fetchProductById(id) {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`,
      );
      productItem.value = response.data;
    } catch (error) {
      console.log("Ошибка загрузки данных о продукте", error);
      throw error;
    }
  }

  // очистим данные об одном товаре в сторе (детализация)
  function resetProductItem() {
    productItem.value = {};
  }

  // получить статус авторизации
  function getIsAuth(value) {
    return (isAuthValue.value = value);
  }

  // getters
  // количество товаров в корзине
  const ordersCount = computed(() => orders.value.length);

  const isLoading = ref(false);

  return {
    products,
    fetchProducts,
    fetchProductById,
    resetProductItem,
    productsLoaded,
    getIsAuth,
    isAuthValue,
    orders,
    isLoading,
    productItem,
    ordersCount,
  };
});
