<template>
  <Popper placement="bottom" arrow>
    <button style="width: 100px">Click this</button>
    <template #content>
      <div>This is the content</div>
    </template>
  </Popper>
</template>

<script>
  import Popper from "../../dist/popper.esm";
  export default {
    components: {
      Popper,
    },
  };
</script>
