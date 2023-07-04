import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomePageView from "@/views/HomePageView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/homepage/',
    name: "Homepage",
    component: HomePageView
  },
  {
    path: '/login/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register/',
    name: 'Register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
