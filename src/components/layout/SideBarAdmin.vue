<template>
  <aside class="sidebar">
    <!-- 1. Logo Section -->
    <div class="sidebar-header">
      <div class="logo-container">
        <svg
          class="logo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="brand-name">GameStore Admin</span>
      </div>
    </div>

    <!-- 2. Store/Workspace Selector -->
    <div class="workspace-selector">
      <button class="workspace-btn" @click="toggleWorkspaceMenu">
        <div class="workspace-badge" :style="{ background: currentStore.color }">
          {{ currentStore.initial }}
        </div>
        <div class="workspace-info">
          <span class="workspace-name">{{ currentStore.name }}</span>
          <span class="workspace-plan">{{ currentStore.plan }}</span>
        </div>
        <svg
          class="workspace-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div v-if="showWorkspaceMenu" class="workspace-menu">
        <div
          v-for="store in stores"
          :key="store.id"
          class="workspace-item"
          @click="selectStore(store)"
        >
          <div class="item-badge" :style="{ background: store.color }">{{ store.initial }}</div>
          <div class="item-info">
            <span class="item-name">{{ store.name }}</span>
            <span class="item-plan">{{ store.plan }}</span>
          </div>
          <span v-if="store.id === currentStore.id" class="checkmark">✓</span>
        </div>
        <div class="workspace-divider"></div>
        <button class="workspace-action">+ Add Workspace</button>
      </div>
    </div>

    <!-- 3. Search Bar -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <svg
          class="search-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search" class="search-input" />
        <span class="shortcut-hint">⌘K</span>
      </div>
    </div>

    <!-- 4. Navigation Menu -->
    <nav class="sidebar-nav">
      <div v-for="(group, index) in menuGroups" :key="index" class="nav-group">
        <h4 class="group-title">{{ group.title }}</h4>
        <ul>
          <li v-for="item in group.items" :key="item.label">
            <router-link :to="item.to" class="nav-item" :class="{ active: isRouteActive(item.to) }">
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script>
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'

// Simple icon components (SVGs)
const IconHome = {
  render: () =>
    h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        width: 16,
        height: 16,
      },
      [
        h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
        h('polyline', { points: '9 22 9 12 15 12 15 22' }),
      ],
    ),
}
const IconPOS = {
  render: () =>
    h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        width: 16,
        height: 16,
      },
      [
        h('rect', { x: 1, y: 4, width: 22, height: 16, rx: 2, ry: 2 }),
        h('line', { x1: 1, y1: 10, x2: 23, y2: 10 }),
      ],
    ),
}
const IconBox = {
  render: () =>
    h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        width: 16,
        height: 16,
      },
      [
        h('path', {
          d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
        }),
        h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }),
        h('line', { x1: 12, y1: 22.08, x2: 12, y2: 12 }),
      ],
    ),
}
const IconUsers = {
  render: () =>
    h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        width: 16,
        height: 16,
      },
      [
        h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
        h('circle', { cx: 9, cy: 7, r: 4 }),
        h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
        h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' }),
      ],
    ),
}
const IconGrid = {
  render: () =>
    h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        width: 16,
        height: 16,
      },
      [
        h('rect', { x: 3, y: 3, width: 7, height: 7 }),
        h('rect', { x: 14, y: 3, width: 7, height: 7 }),
        h('rect', { x: 14, y: 14, width: 7, height: 7 }),
        h('rect', { x: 3, y: 14, width: 7, height: 7 }),
      ],
    ),
}

export default {
  setup() {
    const route = useRoute()
    const showWorkspaceMenu = ref(false)

    const stores = ref([
      { id: 1, name: 'Main Store', plan: 'Pro', color: '#2563eb', initial: 'M' },
      { id: 2, name: 'Online Shop', plan: 'Basic', color: '#7c3aed', initial: 'O' },
      { id: 3, name: 'Pop-up Store', plan: 'Starter', color: '#06b6d4', initial: 'P' },
    ])

    const currentStore = ref(stores.value[0])

    const isRouteActive = (routePath) => {
      return route.path === routePath
    }

    const toggleWorkspaceMenu = () => {
      showWorkspaceMenu.value = !showWorkspaceMenu.value
    }

    const selectStore = (store) => {
      currentStore.value = store
      showWorkspaceMenu.value = false
    }

    const menuGroups = [
      {
        title: 'Sales',
        items: [
          { label: 'Home', icon: IconHome, active: false, to: '/dashboard' },
          { label: 'Point of Sale', icon: IconPOS, active: false, to: '/dashboard/point-of-sale' },
          { label: 'Orders', icon: IconBox, active: false, to: '/dashboard/orders' },
          { label: 'Products', icon: IconGrid, active: false, to: '/dashboard/products' },
          { label: 'Customers', icon: IconUsers, active: false, to: '/dashboard/customers' },
        ],
      },
      {
        title: 'Management',
        items: [
          {
            label: 'Collaborators',
            icon: IconUsers,
            to: '/dashboard/collaborators',
            active: false,
          },
          { label: 'Inventory', icon: IconBox, active: false, to: '/dashboard/inventory' },
        ],
      },
    ]

    return {
      menuGroups,
      isRouteActive,
      showWorkspaceMenu,
      stores,
      currentStore,
      toggleWorkspaceMenu,
      selectStore,
    }
  },
}
</script>

<style scoped>
/* Color variables based on the dark theme image */
:root {
  --bg-sidebar: #09090b; /* Zinc 950 */
  --bg-hover: #27272a; /* Zinc 800 */
  --text-main: #e4e4e7; /* Zinc 200 */
  --text-muted: #a1a1aa; /* Zinc 400 */
  --border-color: #27272a;
}

.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #0b0c10, #000000);
  color: #a1a1aa;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding: 1.5rem;
  box-sizing: border-box;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
}

/* 1. Logo */
.sidebar-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #1f2937;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
}
.logo-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border-radius: 8px;
  padding: 4px;
}
.brand-name {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 2. Store/Workspace Selector */
.workspace-selector {
  position: relative;
  margin-bottom: 1.5rem;
}

.workspace-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #111827, #0f172a);
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.workspace-btn:hover {
  border-color: #2563eb;
  background: linear-gradient(135deg, #1a2744, #1e2d4a);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.15);
}

.workspace-badge {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.workspace-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: left;
  min-width: 0;
}

.workspace-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workspace-plan {
  font-size: 0.7rem;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
}

.workspace-arrow {
  width: 16px;
  height: 16px;
  color: #71717a;
  transition: all 0.2s;
  flex-shrink: 0;
}

.workspace-btn:hover .workspace-arrow {
  color: #38bdf8;
  transform: translateY(2px);
}

.workspace-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.workspace-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.workspace-item:hover {
  background-color: #0f172a;
}

.item-badge {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #e2e8f0;
}

.item-plan {
  font-size: 0.7rem;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.checkmark {
  color: #38bdf8;
  font-weight: 800;
  font-size: 1.1rem;
}

.workspace-divider {
  height: 1px;
  background: #1f2937;
  margin: 0.5rem 0;
}

.workspace-action {
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: none;
  color: #38bdf8;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.workspace-action:hover {
  background-color: #0f172a;
  color: #60a5fa;
}

/* 3. Search Bar */
.search-container {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: #71717a;
  transition: color 0.2s;
}

.search-input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 0.65rem 2.5rem 0.65rem 2.4rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: #71717a;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  background: #0f172a;
}

.search-input:focus + .search-icon {
  color: #38bdf8;
}

.shortcut-hint {
  position: absolute;
  right: 0.75rem;
  font-size: 0.7rem;
  color: #71717a;
  background: #1f2937;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.3px;
  pointer-events: none;
}

/* 4. Navigation */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: #374151;
}

.nav-group {
  margin-bottom: 1.5rem;
}

.group-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #71717a;
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
  font-weight: 700;
  letter-spacing: 0.6px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.85rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.nav-item:hover {
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.1), transparent);
  color: #cbd5e1;
  border-left-color: #38bdf8;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.15), transparent);
  color: #e2e8f0;
  font-weight: 700;
  border-left-color: #38bdf8;
  box-shadow: inset 0 0 12px rgba(37, 99, 235, 0.1);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, #2563eb, #38bdf8);
  border-radius: 0 2px 2px 0;
}

@media (max-width: 900px) {
  .sidebar {
    width: 260px;
    padding: 1.2rem;
  }

  .workspace-name {
    font-size: 0.85rem;
  }

  .nav-item {
    padding: 0.65rem 0.75rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .sidebar {
    width: 240px;
    padding: 1rem;
  }

  .sidebar-header {
    margin-bottom: 1rem;
  }

  .workspace-selector {
    margin-bottom: 1rem;
  }

  .search-container {
    margin-bottom: 1rem;
  }

  .brand-name {
    display: none;
  }

  .logo-container {
    justify-content: center;
  }
}
</style>
