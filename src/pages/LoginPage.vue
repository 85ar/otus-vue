<template>
  <div class="loginContainer">
    <div class="title">Login</div>
    <form class="loginForm" @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../store/shopStore";

const router = useRouter();
const username = ref("");
const password = ref("");
const shopStore = useShopStore();

const login = () => {
  // Проверка учетных данных (фейковая проверка)
  if (username.value === "user" && password.value === "123") {
    // В случае успешной авторизации сохраняем флаг в localStorage
    localStorage.setItem("authenticated", "true");
    // Перенаправляем юзера на защищенную страницу (см. роутер)
    router.push("/");
    shopStore.getIsAuth(true);
  } else {
    alert("Invalid username or password");
  }
};
</script>

<style lang="scss" scoped>

.title {
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}
.loginContainer {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid $additional;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.loginForm {
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid $additional;
    border-radius: 4px;
    outline: none;
  }

  button {
    padding: 10px;
    font-size: 16px;
    background-color: $third;
    color: $primary;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: $accent;
    }
  }
}
</style>
