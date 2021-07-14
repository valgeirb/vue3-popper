<template>
  <div class="popper-container">
    <div class="text-center">
      <span>Click the Demo button to show the Popper</span>
    </div>
    <Popper class="popper-demo" arrow content="This is the Popper content 🍿">
      <Button>Demo</Button>
    </Popper>
  </div>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperDemo",
    components: {
      Popper,
      Button,
    },
  };
</script>

<style scoped>
  .popper-container {
    padding: 50px;
    margin: 0 20px 20px;
    border: 2px dashed #dadada;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .text-center {
    text-align: center;
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
