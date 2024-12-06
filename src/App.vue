<template>
  <n-message-provider>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/test">Testtt</RouterLink>
        <RouterLink to="/naive">Naive UI</RouterLink>
        <RouterLink to="/barcode">Barcode</RouterLink>
        <RouterLink to="/dragTest">DragTest</RouterLink>
        <RouterLink to="/slotLoop">SlotLoop</RouterLink>
      </nav>
    </header>
    <div class="container">
      <RouterView />
    </div>
  </n-message-provider>
</template>
<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { NMessageProvider } from "naive-ui";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<style scoped>
.container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 100px;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;

    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
