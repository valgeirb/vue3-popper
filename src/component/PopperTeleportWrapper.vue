<template>
  <teleport v-if="teleport" :to="teleport">
    <slot />
  </teleport>
  <slot v-else />
</template>

<script>
  import { defineComponent } from "vue";
  /**
   * The Popper Teleport Wrapper component.
   */
  export default /*#__PURE__*/ defineComponent({
    name: "PopperTeleportWrapper",
    props: {
        /**
         * Teleport popper element to selector
         */
        teleport: {
        type: String,
        default: null,
        },
    },
  });
</script>