<template>
  <header class="header">
    <a href="/" class="logo">Shop</a>
    <div class="headerBlock">
      <nav class="nav">
        <ul class="ul">
          <li class="li">
            <a href="">Link1</a>
          </li>
          <li class="li">
            <a href="">Link2</a>
          </li>
          <li class="li">
            <a href="">Link3</a>
          </li>
        </ul>
      </nav>
      <div>
        <input
          type="text"
          v-model="searchProduct"
          class="input"
          placeholder="Search"
          @input="searchProductHandler"
        />
      </div>
      <div>
        <button>Корзина</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const searchProduct = ref("");

const emit = defineEmits();

const searchProductHandler = () => {
  emit("searchProductEmit", searchProduct.value);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 80px;
  margin-bottom: 50px;
  padding: 21px 0;
  border-bottom: 1px solid $additional;
}
.logo {
  color: #f19c38;
  font-size: 20px;
}
.ul {
  display: flex;
  min-width: 250px;
  justify-content: space-between;
}
.headerBlock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 832px;
}
.input {
  border: 1px solid $additional;
  border-radius: 5px;
  padding: 4px 6px;
  width: 250px;
}
</style>
