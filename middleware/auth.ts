import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // Initialize auth if cookies exist
  authStore.initAuth()

  // Allow login page
  if (to.path === '/admin/login') {
    if (authStore.isAuthenticated) {
      return navigateTo('/admin')
    }
    return
  }

  // Protect all /admin/* routes
  if (to.path.startsWith('/admin') && !authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
