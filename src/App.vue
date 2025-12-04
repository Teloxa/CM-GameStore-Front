<template>
  <AppHeader />
  <main class="app-container">
    <RouterView />
  </main>
</template>

<script setup>
import AppHeader from './components/Header.vue'
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
