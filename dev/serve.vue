<template>
  <div id="app">
    <Popper arrow>
      <button>Click this</button>
      <template #content>
        <div>This is the content</div>
      </template>
    </Popper>
    <Popper arrow teleport="body">
      <button>Click this</button>
      <template #content>
        <div>This is the teleported content</div>
      </template>
    </Popper>
    <Popper hover arrow>
      <button>Hover this</button>
      <template #content>
        <div>This is the content</div>
      </template>
    </Popper>
    <Popper hover arrow teleport="body">
      <button>Hover this</button>
      <template #content>
        <div>This is the teleported content</div>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
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
