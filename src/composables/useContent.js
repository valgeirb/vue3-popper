import { ref, onMounted, onBeforeUnmount } from "vue";
export default function useContent(slots, popperNode) {
  let observer = null;
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined) {
      hasContent.value = true;
    }

    observer = new MutationObserver(checkContent);
    observer.observe(popperNode.value, {
      childList: true,
      subtree: true,
    });
  });

  onBeforeUnmount(() => observer.disconnect());

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
