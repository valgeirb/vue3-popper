import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite.js";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import offset from "@popperjs/core/lib/modifiers/offset";
import arrow from "@popperjs/core/lib/modifiers/arrow";

export default function usePopper(options) {
  const isOpen = ref(false);
  const popperInstance = ref(null);
  const popperNode = ref(null);
  const triggerNode = ref(null);

  const hide = () => {
    isOpen.value = false;
  };

  const show = () => {
    if (isOpen.value) {
      return;
    }

    isOpen.value = true;
  };

  const toggle = () => {
    isOpen.value ? hide() : show();
  };

  watch(isOpen, async isOpen => {
    if (isOpen) {
      await nextTick();
      initializePopper();
    }
  });

  const initializePopper = () => {
    popperInstance.value = createPopper(triggerNode.value, popperNode.value, {
      placement: options.placement,
      modifiers: [
        preventOverflow,
        flip,
        arrow,
        offset,
        {
          name: "offset",
          options: {
            offset: [0, options.offset],
          },
        },
      ],
    });

    popperInstance.value.update();
  };

  return {
    isOpen,
    hide,
    show,
    toggle,
    popperInstance,
    popperNode,
    triggerNode,
  };
}
