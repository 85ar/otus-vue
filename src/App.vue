<template>
  <div class="app">
    <Layout v-slot="{ searchProduct }" :orderCounts="orderCounts">
      <router-view
        :searchProduct="searchProduct"
        @ordersEmit="ordersEmit"
        :orders="orders"
        @deleteOrderEmit="deleteOrderEmit"
        :deleteOrders="deleteOrders"
      />
    </Layout>
  </div>
</template>

<script setup>
import Layout from "./components/Layout.vue";
import { ref } from "vue";
const orders = ref([]);
const deleteOrders = ref([]);
const orderCounts = ref();

const ordersEmit = (data) => {
  orders.value = data;
  orderCounts.value = data.length;
};
const deleteOrderEmit = (data) => {
  console.log("deleteOrder App", data);
  deleteOrders.value = data;
};
</script>

<style lang="scss" scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
