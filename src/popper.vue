<script>
  import {
    defineComponent,
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    nextTick,
  } from "vue";
  import { createPopper } from "@popperjs/core/lib/popper-lite.js";
  import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
  import flip from "@popperjs/core/lib/modifiers/flip.js";
  import offset from "@popperjs/core/lib/modifiers/offset";
  import arrow from "@popperjs/core/lib/modifiers/arrow";

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
      hover: {
        type: Boolean,
        default: false,
      },
      arrow: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { slots }) {
      console.log("test", slots);
      const children = slots.default();

      if (children.length > 1) {
        return console.error(
          `[Popover]: The <Popover> component expects only one child element at its root. You passed ${children.length} child nodes.`,
        );
      }

      const isOpen = ref(false);
      const popperInstance = ref(null);
      const popoverNode = ref(null);
      const triggerNode = ref(null);

      const hide = () => {
        isOpen.value = false;
      };

      const show = async () => {
        if (isOpen.value) {
          return;
        }

        isOpen.value = true;
        await nextTick();
        setupPopper();
      };

      const toggleOpen = () => {
        isOpen.value ? hide() : show();
      };

      const setupPopper = () => {
        popperInstance.value = createPopper(
          triggerNode.value,
          popoverNode.value,
          {
            placement: props.placement,
            modifiers: [
              preventOverflow,
              flip,
              arrow,
              offset,
              {
                name: "offset",
                options: {
                  offset: [0, props.offset],
                },
              },
            ],
          },
        );

        popperInstance.value.update();
      };

      const handleOutsideClick = event => {
        const clickedOutsideOfPopover = !popoverNode.value.contains(
          event.target,
        );
        const clickedOutsideOfTriggerNode = !triggerNode.value.contains(
          event.target,
        );

        if (clickedOutsideOfPopover && clickedOutsideOfTriggerNode) {
          hide();
        }
      };

      onMounted(() => {
        window.addEventListener("click", handleOutsideClick, true);
      });

      onBeforeUnmount(() => {
        window.removeEventListener("click", handleOutsideClick, true);
        popperInstance.value && popperInstance.value.destroy();
      });

      const listeners = computed(() => {
        const hover = {
          mouseover: show,
          mouseleave: hide,
        };

        const onClick = {
          click: toggleOpen,
        };

        return {
          ...((props.hover === true && hover) || onClick),

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
        toggleOpen,
        listeners,
      };
    },
  });
</script>

<template>
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
</template>

<style scoped>
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
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
</style>
