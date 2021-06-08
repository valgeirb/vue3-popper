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
  html {
    background: #2c3e50;
  }
  #app {
    color: #2c3e50;
    margin-top: 200px;
    display: flex;
    justify-content: center;
  }
</style>
