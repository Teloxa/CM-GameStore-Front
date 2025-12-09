import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GameDetailView from '../views/GameDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import CartView from '../views/CartView.vue' 

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
  },
  {
    path: '/games/:id',              
    name: 'game-detail',
    component: GameDetailView,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/Favorites',
    name: 'favorites',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
