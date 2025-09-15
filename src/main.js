import { createApp } from "vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Skeleton from "@brayamvalero/vue3-skeleton";
import "@brayamvalero/vue3-skeleton/dist/style.css";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(Skeleton);

app.mount("#app");
