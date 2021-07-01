export default {
  beforeMount: (el, binding) => {
    el.clickAwayEvent = event => {
      // Clicked outside of the element and its children
      if (
        !(el == event.target || el.contains(event.target)) &&
        binding.value.enabled
      ) {
        // Call the provided method
        binding.value.handler();
      }
    };
    document.addEventListener("click", el.clickAwayEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickAwayEvent);
  },
};
