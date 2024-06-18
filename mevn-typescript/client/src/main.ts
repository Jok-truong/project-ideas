import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "bootswatch/dist/lux/bootstrap.min.css";

createApp(App).use(router).mount("#app");
