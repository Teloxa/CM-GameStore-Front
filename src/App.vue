<template>
  <AppHeader />
  <main class="app-container">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
