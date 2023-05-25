## Installation

::: tip
Like the name suggests, `vue3-popper` is written for Vue 3. There are no plans to support both Vue 2.x and Vue 3.x at the moment.
:::

You can install `Vue 3 Popper` by opening your terminal in your project and running the following command:

With yarn:

```bash
$ yarn add vue3-popper
```

With NPM:

```bash
$ npm i vue3-popper
```

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
  <Popper content="This is the Popper content 🍿">
    <button>Trigger element</button>
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

<!-- ### Browser

::: danger
Add browser example
::: -->

## Usage

You can add Popper to any of your elements or components. Just wrap them with `Popper` and use the `content` prop or slot for your popover.

### Using the content `prop`

If your content is only a simple string, you can use the `content` prop:

```vue
<template>
  <Popper content="This is the Popper content">
    <button>Trigger element</button>
  </Popper>
</template>
```

### Using the content `slot`

If your content is more complex, you can use the `#content` slot:

```vue
<template>
  <Popper>
    <button>Trigger element</button>
    <template #content>
      <div>This is the Popper content</div>
    </template>
  </Popper>
</template>
```

## What about styles?

`Popper` only comes with some barebones styling by default, but it also uses a list of predefined CSS variables. You can overwrite these variables to suit your needs.

### CSS variables

| CSS variable                            | Example value                       |
| --------------------------------------- | ----------------------------------- |
| `--popper-theme-background-color`       | #ffffff                             |
| `--popper-theme-background-color-hover` | #ffffff                             |
| `--popper-theme-text-color`             | inherit                             |
| `--popper-theme-border-width`           | 1px                                 |
| `--popper-theme-border-style`           | solid                               |
| `--popper-theme-border-color`           | #eeeeee                             |
| `--popper-theme-border-radius`          | 6px                                 |
| `--popper-theme-padding`                | 16px                                |
| `--popper-theme-box-shadow`             | 0 6px 30px -6px rgba(0, 0, 0, 0.25) |

You can overwrite them any way you like, for example in a Vue component:

```vue
<template>
  <Popper content="This is the Popper content 🍿">
    <Button>Demo</Button>
  </Popper>
</template>

<style>
  :root {
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>
```

You could also create a `theme.css` file:

```css
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
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

<popper-styled />

### Dynamic theming

Using the CSS variables you could even add multiple themes to your popover.

```css
.dark {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.light {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
```

```vue
<template>
  <Popper
    :class="theme"
    arrow
    disableClickAway
    content="This is the Popper content 🍿"
  >
    <Button>Demo</Button>
  </Popper>
</template>
```

<popper-dynamic-theme />

### I don't want to use CSS variables

That's fine, you can always just apply your own styles, just make sure it's `scoped` and you use the `:deep` selector:

```vue
<template>
  <Popper arrow content="This is the Popper content 🍿">
    <Button>Demo</Button>
  </Popper>
</template>

<style scoped>
  :deep(.popper) {
    background: #e92791;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper .arrow::before) {
    background: #e92791;
  }

  :deep(.popper:hover),
  :deep(.popper:hover > .arrow::before) {
    background: #e92791;
  }
</style>
```

<popper-deep />

## How can I wrap `Popper` with my own component?

It is generally a good idea to wrap 3rd party components like `vue3-popper` with your own local component. It gives you things like:

- Modularity
- Scalability
- Ability to add custom styles or extensions
- **If you need to change something (even swap out vue3-popper for something else) you only need to do that once in your wrapper component.**

Here's an example of how you can wrap `vue3-popper` with your own component:

::: tip
Notice that in this example, `hover`, `openDelay` and `closeDelay` are all hardcoded. This is just to show how you can create an **opinionated** wrapper.
:::

```vue
<template>
  <!-- Hardcoded "hover", "openDelay" and "closeDelay" -->
  <Popper v-bind="$attrs" hover openDelay="200" closeDelay="100">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script>
  import { defineComponent } from "vue";
  import Popper from "vue3-popper";

  export default defineComponent({
    name: "MyPopperWrapper",
    components: {
      Popper,
    },
  });
</script>
```

You could then go on to define your styles etc. and use your component just like you would `Popper`:

```vue
<template>
  <MyPopperWrapper arrow placement="right">
    <Button>Demo</Button>
    <template #content>
      <div>This is the Popper content 🍿</div>
    </template>
  </MyPopperWrapper>
</template>
```

## Reacting to `Popper` events

Sometimes you need to add some side-effects when closing/opening Poppers. You can use the built-in events for that:

```vue
<template>
  <Popper
    arrow
    @open:popper="openAlert"
    @close:popper="closeAlert"
    content="This is the Popper content 🍿"
  >
    <Button>Demo</Button>
  </Popper>
</template>

<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "PopperEvents",
    methods: {
      openAlert() {
        alert("Opening Popper!");
      },
      closeAlert() {
        alert("Closing Popper!");
      },
    },
  });
</script>
```

<popper-events />

## Using scoped slot properties

You can gain access to the `close` function for those edge cases. In this example we use the `close` function to dismiss the Popper when a button is clicked inside of it.

```vue
<template>
  <Popper arrow>
    <Button>Demo</Button>
    <template #content="{ close }">
      <Button @click="close">Close</Button>
    </template>
  </Popper>
</template>
```

<popper-scoped-slots />

## Manually controlling the Popper

You can use the `show` prop to manually control the Popper. Other events (click, hover) are ignored when in manual mode.

```vue
<template>
  <div>
    <Popper arrow content="This is the Popper content 🍿" :show="showPopper">
      <Button>Demo</Button>
    </Popper>
    <div>
      <input id="toggle" type="checkbox" v-model="showPopper" />
      <label for="toggle">Toggle Popper</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PopperManual",
    data() {
      return {
        showPopper: true,
      };
    },
  };
</script>
```

<popper-manual />

::: tip
`Vue 3 Popper` has multiple useful props as well, check out the API docs for more info.
:::
