<template>
  <div
    class="inline-block"
    :style="interactiveStyle"
    @mouseleave="hover && closePopper()"
    ref="popperContainerNode"
  >
    <div
      ref="triggerNode"
      @mouseover="hover && openPopper()"
      @click="togglePopper"
      @focus="openPopper"
      @keyup.esc="closePopper"
    >
      <!-- The default slot to trigger the popper  -->
      <slot />
    </div>
    <Transition name="fade">
      <div
        @click="!interactive && closePopper()"
        v-show="shouldShowPopper"
        class="popper"
        ref="popperNode"
      >
        <slot name="content" :close="close" :isOpen="modifiedIsOpen">
          {{ content }}
        </slot>
        <Arrow v-if="arrow" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { debounce } from "debounce";
  import {
    ref,
    computed,
    defineProps,
    useSlots,
    toRefs,
    watch,
    watchEffect,
    onMounted,
  } from "vue";
  import { usePopper, useContent, useClickAway } from "@/composables";
  import Arrow from "./Arrow.vue";

  const emit = defineEmits(["open:popper", "close:popper"]);
  const slots = useSlots();
  const props = defineProps({
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
     * Offset in pixels along the trigger element
     */
    offsetSkid: {
      type: String,
      default: "0",
    },
    /**
     * Offset in pixels away from the trigger element
     */
    offsetDistance: {
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
     * Manually open/close the Popper, other events are ignored if this prop is set
     */
    show: {
      type: Boolean,
      default: null,
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
     * The z-index of the Popper.
     */
    zIndex: {
      type: [Number, String],
      default: 9999,
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
    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     */
    interactive: {
      type: Boolean,
      default: true,
    },
    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     */
    locked: {
      type: Boolean,
      default: false,
    },
    /**
     * If the content is just a simple string, it can be passed in as a prop
     */
    content: {
      type: String,
      default: null,
    },
  });

  const popperContainerNode = ref(null);
  const popperNode = ref(null);
  const triggerNode = ref(null);
  const modifiedIsOpen = ref(false);

  onMounted(() => {
    const children = slots.default();

    if (children && children.length > 1) {
      return console.error(
        `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
      );
    }
  });

  const {
    arrowPadding,
    closeDelay,
    content,
    disableClickAway,
    disabled,
    interactive,
    locked,
    offsetDistance,
    offsetSkid,
    openDelay,
    placement,
    show,
  } = toRefs(props);

  const { isOpen, open, close } = usePopper({
    arrowPadding,
    emit,
    locked,
    offsetDistance,
    offsetSkid,
    placement,
    popperNode,
    triggerNode,
  });

  const { hasContent } = useContent(slots, popperNode, content);

  const manualMode = computed(() => show.value !== null);
  const invalid = computed(() => disabled.value || !hasContent.value);
  const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
  const enableClickAway = computed(
    () => !disableClickAway.value && !manualMode.value,
  );
  // Add an invisible border to keep the Popper open when hovering from the trigger into it
  const interactiveStyle = computed(() =>
    interactive.value
      ? `border: ${offsetDistance.value}px solid transparent; margin: -${offsetDistance.value}px;`
      : null,
  );

  const openPopperDebounce = debounce(open, openDelay.value);
  const closePopperDebounce = debounce(close, closeDelay.value);

  const openPopper = async () => {
    if (invalid.value || manualMode.value) {
      return;
    }

    closePopperDebounce.clear();
    openPopperDebounce();
  };

  const closePopper = async () => {
    if (manualMode.value) {
      return;
    }

    openPopperDebounce.clear();
    closePopperDebounce();
  };

  const togglePopper = () => {
    isOpen.value ? closePopper() : openPopper();
  };

  /**
   * If Popper is open, we automatically close it if it becomes
   * disabled or without content.
   */
  watch([hasContent, disabled], ([hasContent, disabled]) => {
    if (isOpen.value && (!hasContent || disabled)) {
      close();
    }
  });

  /**
   * In order to eliminate flickering or visibly empty Poppers due to
   * the transition when using the isOpen slot property, we need to return a
   * separate debounced value based on isOpen.
   */
  watch(isOpen, isOpen => {
    if (isOpen) {
      modifiedIsOpen.value = true;
    } else {
      debounce(() => {
        modifiedIsOpen.value = false;
      }, 200);
    }
  });

  /**
   * Watch for manual mode.
   */
  watchEffect(() => {
    if (manualMode.value) {
      show.value ? openPopperDebounce() : closePopperDebounce();
    }
  });

  /**
   * Use click away if it should be enabled.
   */
  watchEffect(() => {
    if (enableClickAway.value) {
      useClickAway(popperContainerNode, closePopper);
    }
  });
</script>

<style scoped>
  .inline-block {
    display: inline-block;
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
    z-index: v-bind(zIndex);
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
