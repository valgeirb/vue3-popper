<p align="center">
<img src="https://raw.githubusercontent.com/valgeirb/vue-popper/main/docs/public/popper.svg">
</p>

# vue3-popper

> A popover component for Vue 3

## Documentation

Check out the [documentation](https://valgeirb.github.io/vue3-popper/)

- [Getting started](https://valgeirb.github.io/vue3-popper/guide/getting-started.html)
- [Usage](https://valgeirb.github.io/vue3-popper/guide/getting-started.html#usage)

## Install

### NPM

```bash
npm install vue3-popper
```

### Yarn

```bash
yarn add vue3-popper
```

## Usage

### Vue environment

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

## Props

| Name           | Default  | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `placement`    | `bottom` | Preferred placement of the popover               |
| `offsetX`      | `0`      | Distance in pixels along the trigger element     |
| `offsetY`      | `12`     | Distance in pixels away from the trigger element |
| `hover`        | `false`  | Trigger the popover on hover                     |
| `arrow`        | `false`  | Display an arrow on the popover                  |
| `arrowPadding` | `0`      | Stop arrow from reaching the edge of the Popper  |

## Events

| Name          | Description                |
| ------------- | -------------------------- |
| `show:popper` | When the popover is shown  |
| `hide:popper` | When the popover is hidden |

## Slots

| Name      | Description             |
| --------- | ----------------------- |
| `content` | For the popover content |
