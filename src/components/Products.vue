<template>
  <div class="products">
    <ProductItem
      @productOrderEmit="productOrder"
      :product="product"
      v-for="product in props.products"
      :key="product.id"
    />
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import { ref } from "vue";
const order = ref([]);

const props = defineProps({
  products: {
    type: Array,
  },
});
const emit = defineEmits();
const productOrder = (data) => {
  // проверка, есть ли товар в корзине
  const orderExistIndex = order.value.findIndex((item) => item.id === data.id);
  //если его там еще нет, то добавляем его
  if (orderExistIndex === -1) {
    order.value.push({ ...data, quantity: 1 });
    emit("orderFinallyEmit", order.value);
  } else {
    // если товар уже есть в корзине, то увеличиваем количество
    order.value[orderExistIndex].quantity++;
  }
};

</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
