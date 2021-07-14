import { toRefs, watch, nextTick, onBeforeUnmount, reactive } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite.js";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import offset from "@popperjs/core/lib/modifiers/offset";
import arrow from "@popperjs/core/lib/modifiers/arrow";

const toInt = x => parseInt(x, 10);

export default function usePopper({
  popperNode,
  triggerNode,
  placement,
  arrowPadding,
  offsetSkid,
  offsetDistance,
  emit,
}) {
  const state = reactive({
    isOpen: false,
    popperInstance: null,
  });

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit("close:popper");
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit("open:popper");
  };

  // Initialize Popper when isOpen, placement change
  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await nextTick();
      initializePopper();
    }
  });

  const initializePopper = () => {
    state.popperInstance = createPopper(triggerNode.value, popperNode.value, {
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
            offset: [toInt(offsetSkid.value), toInt(offsetDistance.value)],
          },
        },
      ],
    });

    state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close,
  };
}
