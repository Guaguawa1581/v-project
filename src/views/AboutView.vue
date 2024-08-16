<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" @input="handleInput" @blur="handleBlur" />
  </div>
</template>
<script setup>
const handleInput = (e) => {
  console.log("input event!!");
};
const handleBlur = (e) => {
  console.log("blur event!!");
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
