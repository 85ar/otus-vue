import { createApp } from "vue";
import "./styles.scss";
import router from "./router/route.js";
import App from "./App.vue";

const app = createApp(App);
app.use(router).mount("#app");
