<script>
  import { defineComponent } from "vue";
  import Popper from "@/popper.vue";

  export default defineComponent({
    name: "ServeDev",
    components: {
      Popper,
    },
  });
</script>

<template>
  <div id="app">
    <Popper placement="bottom" arrow>
      <button style="width: 100px">Click this</button>
      <template #content>
        <div class="test">This is the content</div>
      </template>
    </Popper>
  </div>
</template>

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
  .test {
    width: 100px;
    text-align: center;
    background: white;
    padding: 5px;
  }
</style>
