const clickAway = {
  beforeMount: (el, binding) => {
    el.clickAwayEvent = event => {
      // Clicked outside of the element and its children
      if (!(el == event.target || el.contains(event.target))) {
        // Call the provided method
        binding.value();
      }
    };
    document.addEventListener("click", el.clickAwayEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickAwayEvent);
  },
};

export default clickAway;
