<template>
  <AppHeader v-if="showHeader" />

  <main class="app-container">
    <RouterView />
  </main>

  <AppFooter v-if="showFooter" />

  <!-- Toast global -->
  <AppToast ref="toastRef" />
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import AppToast from "./components/Toast.vue";

const route = useRoute();

const showHeader = computed(() => route.meta.hideHeader !== true);
const showFooter = computed(() => route.meta.hideFooter !== true);

const toastRef = ref(null);

onMounted(() => {
  // Hacemos disponible el toast en window para usarlo en cualquier parte
  window.$toast = toastRef.value;
  console.log("Toast global listo:", window.$toast);
});
</script>

<style>
html,
body,
#app {
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