<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<style lang="css" scoped>
  .button {
    background-color: #3eaf7c;
    border-radius: 6px;
    padding: 0 24px;
    line-height: 52px;
    font-size: 1.2rem;
    font-weight: 500;
    border: 2px solid #3eaf7c;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
    transition: background-color 0.1s ease;
  }
  .button:hover {
    background-color: #4abf8a;
  }
</style>
