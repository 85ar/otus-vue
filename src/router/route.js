import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./../pages/MainPage.vue";
import AddNewProductPage from "./../pages/AddNewProductPage.vue";
import ProductPage from "./../pages/ProductPage.vue";
import AboutPage from "./../pages/AboutPage.vue";
import LoginPage from "./../pages/LoginPage.vue";
import ShoppingCartPage from "./../pages/ShoppingCartPage.vue";
import PathNotFoundPage from "./../pages/PathNotFoundPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
    name: "main",
  },
  {
    path: "/new-product",
    component: AddNewProductPage,
    name: "addNewProduct",
  },
  { path: "/products/:productId", component: ProductPage, name: "product" },
  {
    path: "/about",
    component: AboutPage,
    name: "about",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/shopping-cart",
    component: ShoppingCartPage,
    name: "shoppingCart",
  },
  { path: "/:pathMatch(.*)*", component: PathNotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
