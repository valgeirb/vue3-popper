<template>
  <div class="popper-container">
    <div>
      <input type="radio" v-model="theme" id="light" value="light" />
      <label for="light">Light theme</label>
      <input type="radio" v-model="theme" id="dark" value="dark" />
      <label for="dark">Dark theme</label>
    </div>
    <Popper
      :class="theme"
      arrow
      disableClickAway
      content="This is the Popper content 🍿"
    >
      <Button>Demo</Button>
    </Popper>
  </div>
</template>

<script>
  import { ref } from "vue";
  import Popper from "../../dist/popper.esm";
  import Button from "./Button.vue";
  export default {
    name: "PopperDynamicTheme",
    components: {
      Popper,
      Button,
    },
    setup() {
      const theme = ref("light");

      return {
        theme,
      };
    },
  };
</script>

<style scoped>
  .popper-container {
    padding: 20px;
    border: 2px dashed #dadada;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: space-around;
  }

  .dark {
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: white;
    --popper-theme-border-width: 0px;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }

  .light {
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: #333333;
    --popper-theme-border-width: 1px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #eeeeee;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>
