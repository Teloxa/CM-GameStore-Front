import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/CatalogView',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/Login',
    name: 'login',
    component: LoginView,
    meta: { hideHeader: true, hideFooter: true } 
  },
  {
    path: '/Register',
    name: 'register',
    component: RegisterView,
    meta: { hideHeader: true, hideFooter: true } 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
