## Installation

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

Then, import and register the component:

```javascript
import { createApp } from "vue";
import Popper from "vue3-popper";

const app = Vue.createApp({});
app.component("Popper", Popper);
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

<script>
  export default {
    components: {
      Popper,
    },
  };
</script>
```

### What about styles?

`Popper` doesn't come with any predefined styles. It does however come with a list of predefined CSS variables. You can overwrite these variables to suit your needs.

| CSS variable                            | Default value |
| --------------------------------------- | ------------- |
| `--popper-theme-background-color`       | `#ffffff`     |
| `--popper-theme-background-color-hover` | `#ffffff`     |
| `--popper-theme-text-color`             | `inherit`     |
| `--popper-theme-border-width`           | `1px`         |
| `--popper-theme-border-style`           | `solid`       |
| `--popper-theme-border-color`           | `#ffffff`     |
| `--popper-theme-border-radius`          | `5px`         |
| `--popper-theme-padding`                | `12px`        |

### I don't want to use CSS variables

That's fine, you can always just apply your own styles to the markup inside the `content` slot:

```vue
<template>
  <Popper>
    <button>Trigger!</button>
    <template #content>
      <div>This popper will be on the right side</div>
    </template>
  </Popper>
</template>
```
