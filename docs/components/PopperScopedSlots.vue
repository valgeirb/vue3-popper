<template>
  <div class="popper-container">
    <Popper class="popper-scoped-slots" arrow>
      <Button>Demo</Button>
      <template #content="{ close }">
        <Button @click="close">Close</Button>
      </template>
    </Popper>
  </div>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperScopedSlots",
    components: {
      Popper,
      Button,
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

  .popper-scoped-slots {
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
