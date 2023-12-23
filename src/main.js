import { createApp } from "vue";
import "./styles.scss";
import router from "./router/route.js";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).mount("#app");
