<template>
  <div id="app">
    <Popper placement="right" arrow>
      <button style="width: 100px">Click this</button>
      <template #content>
        <div>This is the content</div>
      </template>
    </Popper>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import Popper from "@/component/Popper.vue";

  export default defineComponent({
    name: "ServeDev",
    components: {
      Popper,
    },
  });
</script>

<style>
  #app {
    color: #2c3e50;
    margin-top: 200px;
    display: flex;
    justify-content: center;
  }
  :root {
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: #333333;
    --popper-theme-border-width: 1px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #dadada;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>
