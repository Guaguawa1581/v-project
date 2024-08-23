<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div><input type="text" v-model="name" /></div>
    <div>{{ name }}</div>
    <div>{{ testMethod() }}</div>
    <div>{{ testMethod() }}</div>
    <div>{{ testComputed }}</div>
    <div>{{ testComputed }}</div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const name = ref("");

const testMethod = () => {
  console.log("this is test");
};
const testComputed = computed(() => {
  console.log("teis is computed");
});
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px;
  }
}
</style>
