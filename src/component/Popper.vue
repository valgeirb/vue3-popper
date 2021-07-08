<template>
  <div v-click-away="{ handler: handleClose, enabled: enableClickAway }">
    <div
      ref="triggerNode"
      @mouseover="hover && handleOpen()"
      @mouseleave="hover && handleClose()"
      @click="handleToggle"
      @focus="handleOpen"
      @blur="handleClose"
      @keyup.esc="handleClose"
      class="inline-block"
    >
      <!-- The default slot to trigger the popper  -->
      <slot />
    </div>
    <Transition name="fade">
      <div
        v-show="shouldShowPopper"
        :class="['popper', shouldShowPopper ? 'inline-block' : null]"
        ref="popperNode"
      >
        <!-- A slot for the popper content -->
        <slot name="content" :close="close" />
        <div v-if="arrow" id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import { computed, defineComponent, toRefs, watch } from "vue";
  import { usePopper, useContent } from "@/composables";
  import clickAway from "@/directives";

  /* Delay execution for a set amount of milliseconds */
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * The Popper component.
   */
  export default /*#__PURE__*/ defineComponent({
    name: "Popper",
    emits: ["open:popper", "close:popper"],
    directives: {
      clickAway,
    },
    props: {
      /**
       * Preferred placement (the "auto" placements will choose the side with most space.)
       */
      placement: {
        type: String,
        default: "bottom",
        validator: function(value) {
          return [
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
          ].includes(value);
        },
      },
      /**
       * Disables automatically closing the popover when the user clicks away from it
       */
      disableClickAway: {
        type: Boolean,
        default: false,
      },
      /**
       * Distance in pixels along the trigger element
       */
      offsetX: {
        type: String,
        default: "0",
      },
      /**
       * Distance in pixels away from the trigger element
       */
      offsetY: {
        type: String,
        default: "12",
      },
      /**
       * Trigger the popper on hover
       */
      hover: {
        type: Boolean,
        default: false,
      },
      /**
       * Disables the Popper. If it was already open, it will be closed.
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Open the Popper after a delay (ms).
       */
      openDelay: {
        type: [Number, String],
        default: 0,
      },
      /**
       * Close the Popper after a delay (ms).
       */
      closeDelay: {
        type: [Number, String],
        default: 0,
      },
      /**
       * Display an arrow on the popper
       */
      arrow: {
        type: Boolean,
        default: false,
      },
      /**
       * Stop arrow from reaching the edge of the popper
       */
      arrowPadding: {
        type: String,
        default: "0",
      },
    },
    setup(props, { slots, emit }) {
      const children = slots.default();

      if (children && children.length > 1) {
        return console.error(
          `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
        );
      }

      const {
        offsetX,
        offsetY,
        arrowPadding,
        placement,
        disabled,
        disableClickAway,
        openDelay,
        closeDelay,
      } = toRefs(props);

      const { popperNode, triggerNode, isOpen, open, close } = usePopper({
        offsetX,
        offsetY,
        arrowPadding,
        placement,
        emit,
      });

      const { hasContent } = useContent(slots, popperNode);

      watch([hasContent, disabled], ([hasContent, disabled]) => {
        if (isOpen.value && (!hasContent || disabled)) {
          close();
        }
      });

      const handleOpen = async () => {
        if (invalid.value) {
          return;
        }

        await delay(openDelay.value);
        open();
      };

      const handleClose = async () => {
        await delay(closeDelay.value);
        close();
      };

      const handleToggle = () => {
        isOpen.value ? handleClose() : handleOpen();
      };

      const invalid = computed(() => disabled.value || !hasContent.value);
      const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
      const enableClickAway = computed(() => !disableClickAway.value);

      return {
        popperNode,
        triggerNode,
        isOpen,
        close,
        handleToggle,
        handleOpen,
        handleClose,
        shouldShowPopper,
        enableClickAway,
      };
    },
  });
</script>

<style scoped>
  #arrow,
  #arrow::before {
    transition: background 250ms ease-in-out;
    position: absolute;
    width: calc(10px - var(--popper-theme-border-width, 0px));
    height: calc(10px - var(--popper-theme-border-width, 0px));
    box-sizing: border-box;
    background: var(--popper-theme-background-color);
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  /* Top arrow */
  .popper[data-popper-placement^="top"] > #arrow {
    bottom: -5px;
  }

  .popper[data-popper-placement^="top"] > #arrow::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-bottom: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Bottom arrow */
  .popper[data-popper-placement^="bottom"] > #arrow {
    top: -5px;
  }

  .popper[data-popper-placement^="bottom"] > #arrow::before {
    border-left: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Left arrow */
  .popper[data-popper-placement^="left"] > #arrow {
    right: -5px;
  }

  .popper[data-popper-placement^="left"] > #arrow::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Right arrow */
  .popper[data-popper-placement^="right"] > #arrow {
    left: -5px;
  }

  .popper[data-popper-placement^="right"] > #arrow::before {
    border-left: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-bottom: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  .popper {
    transition: background 250ms ease-in-out;
    background: var(--popper-theme-background-color);
    padding: var(--popper-theme-padding);
    color: var(--popper-theme-text-color);
    border-radius: var(--popper-theme-border-radius);
    border-width: var(--popper-theme-border-width);
    border-style: var(--popper-theme-border-style);
    border-color: var(--popper-theme-border-color);
    box-shadow: var(--popper-theme-box-shadow);
  }

  .popper:hover,
  .popper:hover > #arrow::before {
    background: var(--popper-theme-background-color-hover);
  }

  .inline-block {
    display: inline-block;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
