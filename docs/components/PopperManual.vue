<template>
  <div class="popper-container">
    <Popper
      class="popper-demo"
      arrow
      content="This is the Popper content 🍿"
      :show="showPopper"
    >
      <Button>Demo</Button>
    </Popper>
    <div>
      <input id="toggle" type="checkbox" v-model="showPopper" />
      <label for="toggle">Toggle Popper</label>
    </div>
  </div>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperManual",
    components: {
      Popper,
      Button,
    },
    data() {
      return {
        showPopper: true,
      };
    },
  };
</script>

<style scoped>
  .popper-container {
    padding: 50px;
    border: 2px dashed #dadada;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 150px;
    align-items: center;
    justify-content: center;
  }

  .popper-demo {
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
