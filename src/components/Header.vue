<template>
  <header class="header">
    <router-link to="/" class="logo">Shop</router-link>
    <div class="headerBlock">
      <nav class="nav">
        <ul class="ul">
          <li class="li">
            <router-link class="link" to="/new-product">
              Add new product
            </router-link>
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
        <div class="userBtn">
          <AnOutlinedUser
            :class="{
              userInIcon: shopStore.isAuthValue,
              userOutIcon: !shopStore.isAuthValue,
            }"
          />
          <span
            :class="{
              userIn: shopStore.isAuthValue,
              userOut: !shopStore.isAuthValue,
            }"
            >{{ shopStore.isAuthValue ? "user" : "guest" }}</span
          >
        </div>
        <router-link to="/shopping-cart" class="shoppingBtn">
          <CaShoppingCart class="shoppingIcon" />
          <span v-if="shopStore.ordersCount" class="orderCount">{{
            shopStore.ordersCount
          }}</span>
        </router-link>
        <button @click="logout" class="logoutBtn">
          <IoOutlineLogOut class="logoutIcon" />
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
import { IoOutlineLogOut } from "@kalimahapps/vue-icons";
import { useRouter } from "vue-router";
import { useShopStore } from "../store/shopStore";

const shopStore = useShopStore();
const router = useRouter();

const searchProduct = ref("");

const searchProductHandler = () => {
  shopStore.setSearchProduct(searchProduct.value);
};

const logout = () => {
  localStorage.setItem("authenticated", "false");
  router.push("/login");
  shopStore.getIsAuth(false);
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
  min-width: 230px;
  justify-content: space-between;
  margin-right: 10px;
  margin-left: 10px;
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
  min-width: 65%;
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
  margin-right: 10px;
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

.userInIcon {
  width: 1.5em;
  height: 1.5em;
  color: $accent;
}
.userIn {
  color: $accent;
}
.userOut {
  color: $secondary;
}
.userOutIcon {
  width: 1.5em;
  height: 1.5em;
  color: $secondary;
}
.logoutIcon {
  width: 1.5em;
  height: 1.5em;
  color: $secondary;
}
.loginBtn {
  display: flex;
}
.logoutBtn {
  display: flex;
  margin-left: 10px;
}
.orderCount {
  color: $accent;
}
.shoppingBtn {
  margin-left: 12px;
  display: flex;
  align-items: flex-start;
}
.userBtn {
  display: flex;
  align-items: center;
  color: $accent;
}
.btnsGroup {
  display: flex;
  align-items: center;
}
</style>
