<template>
  <div class="popper-container">
    <Popper
      class="popper-events"
      arrow
      @open:popper="openAlert"
      @close:popper="closeAlert"
      content="This is the Popper content 🍿"
    >
      <Button>Demo</Button>
    </Popper>
  </div>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperEvents",
    components: {
      Popper,
      Button,
    },
    methods: {
      openAlert() {
        alert("Opening Popper!");
      },
      closeAlert() {
        alert("Closing Popper!");
      },
    },
  };
</script>

<style scoped>
  .popper-container {
    padding: 20px;
    border: 2px dashed #dadada;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popper-events {
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
