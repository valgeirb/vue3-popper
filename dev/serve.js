import { createApp } from "vue";
import Dev from "./serve.vue";
import clickOutside from "../src/directives/click-outside";
import "../src/theme.css";

const app = createApp(Dev).directive("click-outside", clickOutside);
app.mount("#app");
