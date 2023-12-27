import { createApp } from "vue";
import "./styles.scss";
import router from "./router/route.js";
import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

const pinia = createPinia();
const app = createApp(App);
app
  .use(router)
  .use(pinia)
  .use(PrimeVue)
  .use(ToastService)
  .component("Toast", Toast)
  .mount("#app");
