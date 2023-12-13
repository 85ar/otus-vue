<template>
  <div>
    <p class="title">My orders</p>
    <div class="message" v-if="props.orders.length === 0">
      Shopping cart is empty
    </div>
    <div v-else>
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
            <td>{{ order.price }} $</td>
            <td>{{ order.quantity }}</td>
            <td>
              <button class="removeOrderBtn" @click="removeOrder(order)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="checkoutTitle">Checkout now</p>

      <form @submit.prevent="sendForm" class="form">
        <div class="inputGroup">
          <div class="labelGroup">
            <label>Name</label>
            <input type="text" v-model="name" class="input" />
          </div>
          <div class="error">{{ errors.name }}</div>
        </div>

        <div class="inputGroup">
          <div class="labelGroup">
            <label>Surname</label>
            <input type="text" v-model="surname" class="input" />
          </div>
          <div class="error">{{ errors.surname }}</div>
        </div>

        <div class="inputGroup">
          <div class="labelGroup">
            <label>Email</label>
            <input type="text" v-model="email" class="input" />
          </div>
          <div class="error">{{ errors.email }}</div>
        </div>

        <div class="btnsGroup">
          <button class="btn btnBuy" type="submit">Make an order</button>
          <button class="btn" type="reset">Cancel</button>
        </div>
      </form>
      <div v-if="loading">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import * as Yup from "yup";
import Spinner from "../components/Spinner.vue";
const emit = defineEmits();
const loading = ref(false);
const name = ref("");
const surname = ref("");
const email = ref("");

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

const errors = ref({ name: "", surname: "", email: "" });

const sendForm = async () => {
  try {
    await schema.validate(
      { name: name.value, surname: surname.value, email: email.value },
      { abortEarly: false },
    );
    loading.value = true;
    const formData = {
      name: name.value,
      surname: surname.value,
      email: email.value,
    };
    const combinedData = {
      formData,
      orders: props.orders,
    };
    const response = await axios.post("https://httpbin.org/post", combinedData);
    loading.value = false;
    console.log("Response", response.data);
  } catch (validationError) {
    validationError.inner.forEach((error) => {
      errors.value[error.path] = error.message;
    });
    console.error("Validation error:", validationError);
    alert("Error placing an order");
  }
};

const props = defineProps({
  orders: {
    type: Array,
  },
});

const removeOrder = (order) => {
  emit("deleteOrderEmit", order);
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  margin-bottom: 10px;
  text-decoration: underline;
  text-decoration-color: $accent;
  text-underline-offset: 6px;
}
.table {
  border-spacing: 0px;
  border-collapse: collapse;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
}
.form {
  margin: 2px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.checkoutTitle {
  font-size: 18px;
  margin-bottom: 20px;
   text-decoration: underline;
  text-decoration-color: $third;
  text-underline-offset: 6px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th,
td {
  border: 1px solid $primary;
  padding: 8px;
  text-align: left;
}
.table th {
  background-color: $additional;
  text-align: center;
}
.removeOrderBtn {
  cursor: pointer;
  background-color: $third;
  color: $primary;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}
.message {
  display: flex;
  justify-content: center;
}
.error {
  color: red;
  margin-top: 4px;
  display: flex;
}
.labelGroup {
  width: 580px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input {
  min-width: 500px;
  font-size: 14px;
  padding: 6px 0 4px 10px;
  border: 1px solid $additional;
  background-color: $primary;
  border-radius: 4px;
}
.btnsGroup {
  display: flex;
  align-items: center;
  margin-top: 20px;
justify-content: end;
}
.btn {
  cursor: pointer;
  background-color: $third;
  color: $primary;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
}
.btnBuy {
  background-color: $accent;
  margin-right: 10px;
}
.inputGroup {
  margin-bottom: 5px;
}
</style>
