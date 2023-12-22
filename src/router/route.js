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
    meta: { requiresAuth: true },
  },
  {
    path: "/new-product",
    component: AddNewProductPage,
    name: "addNewProduct",
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", component: PathNotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Проверка флага аутентификации
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  // Если маршрут защищенный и пользователь не аутентифицирован, перенаправляем на страницу входа
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

// для редиректа на страницу авторизации
let firstLoad = true;
router.beforeEach((to, from, next) => {
  if (firstLoad && to.path !== "/login") {
    firstLoad = false;
    next("/login");
  } else {
    next();
  }
});


export default router;
