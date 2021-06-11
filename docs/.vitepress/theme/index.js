import DefaultTheme from "vitepress/theme";
import PopperDemo from "../../components/PopperDemo.vue";
import CodeBlock from "../../components/CodeBlock.vue";
import CodeGroup from "../../components/CodeGroup.ts";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("PopperDemo", PopperDemo);
    app.component("CodeBlock", CodeBlock);
    app.component("CodeGroup", CodeGroup);
  },
};
