<template>
  <div class="dashboard-layout">
    <SideBarAdmin />

    <main class="main-content">
      <NavbarAdmin />
      <router-view />
    </main>
  </div>
</template>

<script>
import SideBarAdmin from '@/components/layout/SideBarAdmin.vue'
import NavbarAdmin from '@/components/layout/NavBarAdmin.vue'

export default {
  components: {
    SideBarAdmin,
    NavbarAdmin,
  },
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* space below navbar */
  overflow-y: auto;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b0a08 100%);
}
</style>
