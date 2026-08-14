import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const store = useAuthStore()
  return {
    user: computed(() => store.user),
    token: computed(() => store.token),
    loading: computed(() => store.loading),
    isAuthenticated: computed(() => store.isAuthenticated),
    isSuperAdmin: computed(() => store.isSuperAdmin),
    isEditor: computed(() => store.isEditor),
    isViewer: computed(() => store.isViewer),
    login: store.login,
    logout: store.logout,
    initAuth: store.initAuth
  }
}
