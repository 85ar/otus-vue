<template>
  <header class="header">
    <a href="/" class="logo">Shop</a>
    <div class="headerBlock">
      <nav class="nav">
        <ul class="ul">
          <li class="li">
            <a class="link" href="*">Add new product</a>
          </li>
          <li class="li">
            <a class="link" href="*">All products</a>
          </li>
          <li class="li">
            <a class="link" href="*">About us</a>
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

const emit = defineEmits();
const props = defineProps(["orderCounts"]);
const searchProductHandler = () => {
  emit("searchProductEmit", searchProduct.value);
};

const shoppingCartHandler = () => {
  console.log("click");
};
const loginHandler = () => {
  console.log("login");
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
