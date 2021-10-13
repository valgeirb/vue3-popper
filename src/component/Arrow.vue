<template>
  <div id="arrow" data-popper-arrow></div>
</template>

<style scoped>
  #arrow,
  #arrow::before {
    transition: background 250ms ease-in-out;
    position: absolute;
    width: calc(10px - var(--popper-theme-border-width, 0px));
    height: calc(10px - var(--popper-theme-border-width, 0px));
    box-sizing: border-box;
    background: var(--popper-theme-background-color);
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  /* Top arrow */
  .popper[data-popper-placement^="top"] > #arrow {
    bottom: -5px;
  }

  .popper[data-popper-placement^="top"] > #arrow::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-bottom: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Bottom arrow */
  .popper[data-popper-placement^="bottom"] > #arrow {
    top: -5px;
  }

  .popper[data-popper-placement^="bottom"] > #arrow::before {
    border-left: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Left arrow */
  .popper[data-popper-placement^="left"] > #arrow {
    right: -5px;
  }

  .popper[data-popper-placement^="left"] > #arrow::before {
    border-right: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
    border-top: var(--popper-theme-border-width)
      var(--popper-theme-border-style) var(--popper-theme-border-color);
  }

  /* Right arrow */
  .popper[data-popper-placement^="right"] > #arrow {
    left: -5px;
  }
</style>
