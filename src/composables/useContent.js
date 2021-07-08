import { ref, onMounted, onBeforeUnmount } from "vue";

export default function useContent(slots, popperNode) {
  const observer = ref(null);
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined) {
      hasContent.value = true;
    }

    observer.value = new MutationObserver(checkContent);
    observer.value.observe(popperNode.value, {
      childList: true,
      subtree: true,
    });
  });

  onBeforeUnmount(() => observer.value.disconnect());

  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
