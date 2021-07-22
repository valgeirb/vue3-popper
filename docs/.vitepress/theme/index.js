import DefaultTheme from "vitepress/theme";
import PopperEvents from "../../components/PopperEvents.vue";
import PopperStyled from "../../components/PopperStyled.vue";
import PopperDynamicTheme from "../../components/PopperDynamicTheme.vue";
import PopperDeep from "../../components/PopperDeep.vue";
import PopperScopedSlots from "../../components/PopperScopedSlots.vue";
import PopperDemo from "../../components/PopperDemo.vue";
import PopperManual from "../../components/PopperManual.vue";
import CodeBlock from "../../components/CodeBlock.vue";
import CodeGroup from "../../components/CodeGroup.ts";
import Button from "../../components/Button.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("PopperEvents", PopperEvents);
    app.component("PopperStyled", PopperStyled);
    app.component("PopperDynamicTheme", PopperDynamicTheme);
    app.component("PopperDeep", PopperDeep);
    app.component("PopperScopedSlots", PopperScopedSlots);
    app.component("PopperDemo", PopperDemo);
    app.component("PopperManual", PopperManual);
    app.component("CodeBlock", CodeBlock);
    app.component("CodeGroup", CodeGroup);
    app.component("Button", Button);
  },
};
