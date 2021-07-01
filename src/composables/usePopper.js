import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite.js";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import offset from "@popperjs/core/lib/modifiers/offset";
import arrow from "@popperjs/core/lib/modifiers/arrow";

const toInt = x => parseInt(x, 10);

export default function usePopper({
  placement,
  arrowPadding,
  offsetX,
  offsetY,
  emit,
}) {
  const isOpen = ref(false);
  const popperInstance = ref(null);
  const popperNode = ref(null);
  const triggerNode = ref(null);

  const close = () => {
    if (!isOpen.value) {
      return;
    }
    isOpen.value = false;
    emit("close:popper");
  };

  const open = () => {
    if (isOpen.value) {
      return;
    }
    isOpen.value = true;
    emit("open:popper");
  };

  const toggle = () => {
    isOpen.value ? close() : open();
  };

  watch([isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await nextTick();
      initializePopper();
    }
  });

  const initializePopper = () => {
    popperInstance.value = createPopper(triggerNode.value, popperNode.value, {
      placement: placement.value,
      modifiers: [
        preventOverflow,
        flip,
        arrow,
        {
          name: "arrow",
          options: {
            padding: toInt(arrowPadding.value),
          },
        },
        offset,
        {
          name: "offset",
          options: {
            offset: [toInt(offsetX.value), toInt(offsetY.value)],
          },
        },
      ],
    });

    popperInstance.value.update();
  };

  onBeforeUnmount(() => {
    popperInstance.value && popperInstance.value.destroy();
  });

  return {
    popperNode,
    triggerNode,
    isOpen,
    toggle,
    open,
    close,
  };
}
