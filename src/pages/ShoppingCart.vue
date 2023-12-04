<template>
  <div>
    <p class="title">My orders</p>
    <div class="message" v-if="props.orders.length === 0">
      Shopping cart is empty
    </div>
    <table v-else class="table">
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

    <form @submit.prevent="sendForm" class="form">
      <div>
        <label>Name</label>
        <input type="text" v-model="name" />
        <div class="error">{{ errors.name }}</div>
      </div>
      <div>
        <label>Surname</label>
        <input type="text" v-model="surname" />
        <div class="error">{{ errors.surname }}</div>
      </div>
      <div>
        <label>Email</label>
        <input type="text" v-model="email" />
        <div class="error">{{ errors.email }}</div>
      </div>

      <button type="submit">Submit</button>
      <button type="reset">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import * as Yup from "yup";
const emit = defineEmits();

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
    console.log("Response", response.data);
  } catch (validationError) {
    validationError.inner.forEach((error) => {
      errors.value[error.path] = error.message;
    });
    console.error("Validation error:", validationError);
  }
};

// const isRequired = (value) => {
//   if (value && value.trim()) {
//     return true;
//   }
//   return "This is required";
// };

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
}
.form {
  margin: 2px;
  padding: 3px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
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
.field {
  border: 1px solid grey;
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
}
</style>
