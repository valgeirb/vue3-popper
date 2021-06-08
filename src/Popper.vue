<template>
  <div v-click-outside="hide">
    <div ref="triggerNode" v-on="listeners" style="display: inline-block">
      <slot />
    </div>
    <div
      class="popover"
      ref="popoverNode"
      :style="{ display: isOpen ? 'inline-block' : 'none' }"
    >
      <slot name="content" />
      <div v-if="arrow" id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed, onBeforeUnmount, onMounted } from "vue";
  import usePopper from "./composables/userPopper";

  export default /*#__PURE__*/ defineComponent({
    name: "Popper",
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
       * Customize the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popover
       */
      offset: {
        type: String,
        default: "8",
      },
      /**
       * Show the popover on hover
       */
      hover: {
        type: Boolean,
        default: false,
      },
      /**
       * Add an arrow to the popover
       */
      arrow: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { slots }) {
      const children = slots.default();

      if (children.length > 1) {
        return console.error(
          `[Popover]: The <Popover> component expects only one child element at its root. You passed ${children.length} child nodes.`,
        );
      }

      const { offset, placement } = props;

      const {
        isOpen,
        hide,
        show,
        toggle,
        popperInstance,
        popoverNode,
        triggerNode,
      } = usePopper({ offset, placement });

      onBeforeUnmount(() => {
        popperInstance.value && popperInstance.value.destroy();
      });

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

      return {
        isOpen,
        popoverNode,
        triggerNode,
        toggle,
        hide,
        listeners,
      };
    },
  });
</script>

<style>
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--popover-theme-background-color);
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  .popover[data-popper-placement^="top"] > #arrow {
    bottom: -4px;
  }

  .popover[data-popper-placement^="bottom"] > #arrow {
    top: -4px;
  }

  .popover[data-popper-placement^="left"] > #arrow {
    right: -4px;
  }

  .popover[data-popper-placement^="right"] > #arrow {
    left: -4px;
  }

  .popover {
    background: var(--popover-theme-background-color);
    padding: var(--popover-theme-padding);
    color: var(--popover-theme-text-color);
    border-radius: var(--popover-theme-border-radius);
  }

  .popover:hover,
  .popover:hover > #arrow::before {
    background: var(--popover-theme-background-color-hover);
  }
</style>
