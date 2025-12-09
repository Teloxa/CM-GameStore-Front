<template>
  <header class="navbar">
    <div class="navbar-left">
      <div class="brand-dot" aria-hidden="true"></div>
      <div class="titles">
        <span class="eyebrow">Control Panel</span>
        <span class="page-title">{{ pageTitle }}</span>
      </div>
    </div>

    <div class="navbar-right">
      <div class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" />
        </svg>
        <input type="text" placeholder="Search..." />
      </div>

      <div class="user-dropdown" @click="toggleDropdown">
        <span class="user-info">
          Welcome, User
          <span class="arrow">{{ dropdownOpen ? '▾' : '▸' }}</span>
        </span>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <a href="#"><span class="icon">👤</span> Profile</a>
          <a href="#"><span class="icon">⚙️</span> Settings</a>
          <a href="#"><span class="icon">🔓</span> Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

window.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.user-dropdown')
  if (dropdown && !dropdown.contains(e.target)) {
    dropdownOpen.value = false
  }
})
</script>

<style scoped>
.navbar {
  width: 100%;
  min-height: 64px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  box-sizing: border-box;
  gap: 1rem;
  border-radius: 14px;
  backdrop-filter: blur(10px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.15);
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.eyebrow {
  font-size: 0.8rem;
  color: #94a3b8;
  letter-spacing: 0.4px;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #e2e8f0;
  white-space: nowrap;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.search {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 0.45rem 0.75rem;
  color: #e2e8f0;
  min-width: 200px;
}

.search svg {
  width: 16px;
  height: 16px;
  stroke: #94a3b8;
  fill: none;
  stroke-width: 2;
}

.search input {
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  width: 100%;
  font-size: 0.95rem;
}

.ghost-btn {
  border: 1px solid #1f2937;
  background: #0b1220;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ghost-btn:hover {
  background: #1f2937;
}

.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-info {
  font-size: 0.95rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  color: #e2e8f0;
}

.arrow {
  font-size: 1.1rem;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  background-color: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 10;
}

.dropdown-menu a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1rem;
  font-size: 0.9rem;
  color: #e2e8f0;
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.dropdown-menu a:hover {
  background-color: #1f2937;
  color: #ffffff;
}

.icon {
  font-size: 1rem;
}

@media (max-width: 700px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-right {
    width: 100%;
    justify-content: flex-start;
  }

  .search {
    width: 100%;
    min-width: 0;
  }
}
</style>
