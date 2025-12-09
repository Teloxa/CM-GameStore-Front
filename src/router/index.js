import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NavbarAdmin from '@/components/layout/NavBarAdmin.vue'
import V0Admin from '@/views/V0-Admin.vue'
import V1Admin from '@/views/V1-Admin.vue'
import V2Admin from '@/views/V2-Admin.vue'
import V3Admin from '@/views/V3-Admin.vue'
import V4Admin from '@/views/V4-Admin.vue'
import V5Admin from '@/views/V5-Admin.vue'
import V6Admin from '@/views/V6-Admin.vue'
import SideBarAdmin from '@/components/layout/SideBarAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      redirect: { name: 'dashboard-home' },
      children: [
        {
          path: 'home',
          name: 'dashboard-home',
          component: V0Admin,
          meta: { title: 'Dashboard' },
        },
        {
          path: 'point-of-sale',
          name: 'dashboard-pos',
          component: V1Admin,
          meta: { title: 'Point of Sale' },
        },
        {
          path: 'orders',
          name: 'dashboard-orders',
          component: V2Admin,
          meta: { title: 'Orders' },
        },
        {
          path: 'products',
          name: 'dashboard-products',
          component: V3Admin,
          meta: { title: 'Products' },
        },
        {
          path: 'customers',
          name: 'dashboard-customers',
          component: V4Admin,
          meta: { title: 'Customers' },
        },
        {
          path: 'collaborators',
          name: 'dashboard-collaborators',
          component: V5Admin,
          meta: { title: 'Collaborators' },
        },
        {
          path: 'inventory',
          name: 'dashboard-inventory',
          component: V6Admin,
          meta: { title: 'Inventory' },
        },
      ],
    },
    {
      path: '/navbar-admin',
      name: 'navbar-admin',
      component: NavbarAdmin,
    },
    {
      path: '/sidebar-admin',
      name: 'sidebar-admin',
      component: SideBarAdmin,
    },
  ],
})

export default router
