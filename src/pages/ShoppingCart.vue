<template>
  <div>
    <div>Корзина</div>
    <!-- <div>{{ props.orders }}</div> -->

    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Price</th>
          <th>Count</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in props.orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.title }}</td>
          <td>{{ order.price }}</td>
          <td>{{ order.quantity }}</td>
          <td>
            <button @click="removeOrder(order)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const emit = defineEmits();
const props = defineProps({
  orders: {
    type: Array,
  },
});

const removeOrder = (order) => {
  emit("removeOrderEmit", order);
};
</script>

<style lang="scss" scoped>
.table {
  border-spacing: 0px; /*расстояние между ячейками*/
  border-collapse: collapse; /*  предотвращает задвоение рамок*/
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

button {
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
