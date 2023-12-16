<template>
  <header class="header">
    <router-link to="/" class="logo">Shop</router-link>
    <div class="headerBlock">
      <nav class="nav">
        <ul class="ul">
          <li class="li">
            <router-link class="link" to="/new-product" @click="newProductHandler">
              Add new product
            </router-link>
          </li>
          <li class="li">
            <router-link class="link" to="/">All products</router-link>
          </li>
          <li class="li">
            <router-link class="link" to="/about">About us</router-link>
          </li>
        </ul>
      </nav>
      <div class="searchBlock">
        <input
          type="text"
          v-model="searchProduct"
          class="input"
          placeholder="Search"
          @input="searchProductHandler"
        />
        <div class="searchIcon"><AnOutlinedSearch /></div>
      </div>
      <div class="btnsGroup">
        <button @click="loginHandler" class="loginBtn">
          <AnOutlinedUser class="userIcon" />
        </button>
        <button @click="shoppingCartHandler" class="shoppingBtn">
          <CaShoppingCart class="shoppingIcon" />
          <span class="orderCount">{{ props.orderCounts }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { CaShoppingCart } from "@kalimahapps/vue-icons";
import { AnOutlinedSearch } from "@kalimahapps/vue-icons";
import { AnOutlinedUser } from "@kalimahapps/vue-icons";

const searchProduct = ref("");
const isOpenShoppingCart = ref(false);
const isOpenAddNewProduct = ref(false);
const emit = defineEmits();
const props = defineProps(["orderCounts"]);
const searchProductHandler = () => {
  emit("searchProductEmit", searchProduct.value);
};

const shoppingCartHandler = () => {
  isOpenShoppingCart.value = !isOpenShoppingCart.value;
  emit("openShoppingCart", isOpenShoppingCart.value);
};
const loginHandler = () => {
  console.log("login");
};

const newProductHandler = () => {
  isOpenAddNewProduct.value = !isOpenAddNewProduct.value;
  emit("openAddNewProduct", isOpenAddNewProduct.value);
};

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 70px;
  margin-bottom: 50px;
  padding: 21px 0;
  border-bottom: 1px solid $additional;
}
.logo {
  color: #f19c38;
  font-size: 24px;
}
.ul {
  display: flex;
  min-width: 350px;
  justify-content: space-between;
}
.li {
  font-size: 16px;
}
.link {
  color: $secondary;
}
.link:hover {
  color: $third;
}
.headerBlock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80%;
}
.input {
  width: 220px;
  padding: 4px;
  outline: none;
}
.searchBlock {
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid $additional;
  padding-left: 10px;
  padding-right: 10px;
}
.searchIcon {
  display: flex;
  color: $additional;
}
.shoppingIcon {
  width: 1.5em;
  height: 1.5em;
  color: $secondary;
}
.userIcon {
  width: 1.5em;
  height: 1.5em;
  color: $secondary;
}
.loginBtn {
  display: flex;
}
.orderCount {
  color: $accent;
}
.shoppingBtn {
  margin-left: 10px;
  display: flex;
}
.btnsGroup {
  display: flex;
  align-items: center;
}
</style>
