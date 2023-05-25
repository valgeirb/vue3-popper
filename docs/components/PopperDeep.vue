<template>
  <div class="popper-container">
    <Popper arrow content="This is the Popper content 🍿">
      <Button>Demo</Button>
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
  .popper-container :deep(.popper) {
    background: #e92791;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper .arrow::before) {
    background: #e92791;
  }

  .popper-container :deep(.popper:hover),
  .popper-container :deep(.popper:hover > .arrow::before) {
    background: #e92791;
  }
</style>
