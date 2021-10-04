export default {
  beforeMount: (el, binding) => {
    el.clickAwayEvent = event => {
      if(!binding.value.enabled) {
        return;
      }

      const allowedEls = [el];
      if(Array.isArray(binding.value.ignore)) {
        binding.value.ignore.forEach((refName) => {
          allowedEls.push(binding.instance.$refs[refName]);
        });
      }
      const safeClickedEl = allowedEls.find((element) => 
        element != null && (element == event.target || element.contains(event.target))
      );
      // Clicked outside of the element and its children
      if (!safeClickedEl) {
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
