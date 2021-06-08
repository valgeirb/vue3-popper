const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // Clicked outside of the element and its children
      if (!(el == event.target || el.contains(event.target))) {
        // Call the provided method
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export default clickOutside;
