import {createRouter, createWebHistory} from 'vue-router'
import FHDashboard from '@/components/FHDashboard.vue'
import {keycloak} from "@/auth/keycloak.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{path: '/dashboard', component: FHDashboard},],
})



router.beforeEach((to) => {
  if (!keycloak.authenticated) {
    return keycloak.login({redirectUri: `${location.origin}${to.fullPath}`})
  }
})

export default router
