## Installation

::: warning
Vue Popper is currently in 0.x status. It is already ready for use, but API may still change and features will be added between minor releases.
:::

You can install Vue Popper by opening your terminal in your project an running the following command:

<CodeGroup>
<CodeBlock title="YARN" active>
```bash
yarn add vue3-popper
```
</CodeBlock>

<CodeBlock title="NPM">
```bash
npm i vue3-popper
```
</CodeBlock>
</CodeGroup>

### Global

You can import and register the component globally:

```javascript
import { createApp } from "vue";
import Popper from "vue3-popper";

const app = Vue.createApp({});
app.component("Popper", Popper);
```

### Component

Or use it on a case by case basis:

```html
<template>
  <Popper>
    <button>Trigger element</button>
    <template #content>
      <div>This is the Popper content</div>
    </template>
  </Popper>
</template>

<script>
  import { defineComponent } from "vue";
  import Popper from "vue3-popper";

  export default defineComponent({
    components: {
      Popper,
    },
  });
</script>
```

## Usage

You can add Popper to any of your elements or components. Just wrap them with `Popper` and use the `#content` slot for your popover:

```vue
<template>
  <Popper>
    <button>Trigger!</button>
    <template #content>
      <div>This is the content</div>
    </template>
  </Popper>
</template>
```

### What about styles?

`Popper` comes with a list of predefined CSS variables. You can overwrite these variables to suit your needs.

#### CSS variables

| CSS variable                            | Default value                       |
| --------------------------------------- | ----------------------------------- |
| `--popper-theme-background-color`       | #ffffff                             |
| `--popper-theme-background-color-hover` | #ffffff                             |
| `--popper-theme-text-color`             | inherit                             |
| `--popper-theme-border`                 | 1px solid #efefef                   |
| `--popper-theme-border-radius`          | 6px                                 |
| `--popper-theme-padding`                | 16px                                |
| `--popper-theme-shadow`                 | 0 6px 30px -6px rgba(0, 0, 0, 0.25) |

Using these variables, you could for example create a `theme.css` file:

```css
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: inherit;
  --popper-theme-border: none;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 16px;
  --popper-theme-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
```

Import it:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import "./theme.css"; // Magic happens here

createApp(App).mount("#app");
```

And your Popper is styled!

### I don't want to use CSS variables

That's fine, you can always just apply your own styles, just make sure it's `scoped` and you use the `:deep` selector:

```vue
<template>
  <Popper>
    <button>Trigger!</button>
    <template #content>
      <div>This is the content</div>
    </template>
  </Popper>
</template>

<style scoped>
  :deep(.popper) {
    background: #3a3a3a;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper #arrow::before) {
    background: #3a3a3a;
  }
</style>
```
