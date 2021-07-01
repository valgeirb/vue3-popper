<template>
  <div class="popper-container">
    <Popper placement="right" arrow>
      <Button>Click this</Button>
      <template #content>
        <div>This is the Popper content</div>
      </template>
    </Popper>
  </div>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperDeep",
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
  :deep(.popper) {
    background: #e92791;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper #arrow::before) {
    background: #e92791;
  }
</style>
