<template>
  <div class="popper-container">
    <div>
      <span>Click the Demo button for a random Popper placement</span>
    </div>
    <Popper
      @open:popper="randomize"
      class="popper-demo"
      :placement="randomPlacement"
      arrow
    >
      <Button>Demo</Button>
      <template #content>
        <div>This is the Popper content 🍿</div>
      </template>
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
    data() {
      return {
        randomPlacement: "right",
      };
    },
    methods: {
      randomize() {
        const placements = [
          "auto",
          "auto-start",
          "auto-end",
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "right",
          "right-start",
          "right-end",
          "left",
          "left-start",
          "left-end",
        ];

        this.randomPlacement =
          placements[Math.floor(Math.random() * placements.length)];
      },
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
    align-items: center;
    justify-content: center;
    gap: 50px;
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
