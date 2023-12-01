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
import { ref, watch } from "vue";
const order = ref([]);

const props = defineProps({
  products: {
    type: Array,
  },
  deleteOrder: {
    type: Object,
  },
});
const emit = defineEmits();
const productOrder = (data) => {
  order.value.push(data);
  emit("orderFinallyEmit", order.value);
};

const deleteOrderWatch = () => {
  console.log("valueDelete", props.deleteOrder);
  const newOrder = order.value.filter((order) => {
    order.id !== props.deleteOrder.id;
  });
  emit("orderFinallyEmit", newOrder);

};

watch(() => props.deleteOrder, deleteOrderWatch);
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
