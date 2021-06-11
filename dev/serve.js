import { createApp } from "vue";
import Dev from "./serve.vue";
import "../src/theme.css";

const app = createApp(Dev);
app.mount("#app");
