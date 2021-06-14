<template>
  <div v-click-away="hide">
    <div ref="triggerNode" v-on="listeners" class="inline-block">
      <!-- The default slot to trigger the popper  -->
      <slot />
    </div>
    <Transition name="fade">
      <div
        v-if="isOpen"
        :class="['popper', isOpen ? 'inline-block' : null]"
        ref="popperNode"
      >
        <!-- A slot for the popper content -->
        <slot name="content" />
        <div v-if="arrow" id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import {
    defineComponent,
    computed,
    onBeforeUnmount,
    watch,
    toRefs,
  } from "vue";
  import usePopper from "../composables/userPopper";
  import clickAway from "../directives/click-away";
  /**
   * The Popper component.
   */
  export default /*#__PURE__*/ defineComponent({
    name: "Popper",
    emits: ["show:popper", "hide:popper"],
    directives: {
      clickAway,
    },
    props: {
      /**
       * Preferred [placement](https://popper.js.org/docs/v2/constructors/#options)
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
       * Customize the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popper
       */
      offsetX: {
        type: String,
        default: "0",
      },
      offsetY: {
        type: String,
        default: "12",
      },
      /**
       * Show the popper on hover
       */
      hover: {
        type: Boolean,
        default: false,
      },
      /**
       * Add an arrow to the popper
       */
      arrow: {
        type: Boolean,
        default: false,
      },
      /**
       * Stop arrow from reaching the edge of the Popper
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

      const { offsetX, offsetY, arrowPadding, placement } = toRefs(props);

      const {
        isOpen,
        hide,
        show,
        toggle,
        popperInstance,
        popperNode,
        triggerNode,
      } = usePopper({ offsetX, offsetY, arrowPadding, placement });

      const listeners = computed(() => {
        const hover = {
          mouseover: show,
          mouseleave: hide,
        };

        const onClick = {
          click: toggle,
        };

        return {
          ...((props.hover && hover) || onClick),
          focus: () => {
            show();
          },
          blur: () => {
            hide();
          },
        };
      });

      watch(isOpen, isOpen => {
        if (isOpen) {
          emit("show:popper");
        } else {
          emit("hide:popper");
        }
      });

      onBeforeUnmount(() => {
        popperInstance.value && popperInstance.value.destroy();
      });

      return {
        isOpen,
        popperNode,
        triggerNode,
        toggle,
        hide,
        listeners,
      };
    },
  });
</script>

<style>
  :root {
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: inherit;
    --popper-theme-border: 1px solid #efefef;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 16px;
    --popper-theme-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>

<style scoped>
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
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

  .popper[data-popper-placement^="top"] > #arrow {
    bottom: -4px;
  }

  .popper[data-popper-placement^="bottom"] > #arrow {
    top: -4px;
  }

  .popper[data-popper-placement^="left"] > #arrow {
    right: -4px;
  }

  .popper[data-popper-placement^="right"] > #arrow {
    left: -4px;
  }

  .popper {
    background: var(--popper-theme-background-color);
    padding: var(--popper-theme-padding);
    color: var(--popper-theme-text-color);
    border-radius: var(--popper-theme-border-radius);
    border: var(--popper-theme-border);
    box-shadow: var(--popper-theme-shadow);
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
