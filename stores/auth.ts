import { defineStore } from 'pinia'

export interface User {
  id: string
  username: string
  email: string
  name: string
  role: 'Super Admin' | 'Editor' | 'Viewer'
  avatar: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isSuperAdmin: (state) => state.user?.role === 'Super Admin',
    isEditor: (state) => state.user?.role === 'Editor' || state.user?.role === 'Super Admin',
    isViewer: (state) => !!state.user
  },
  actions: {
    initAuth() {
      const cookieToken = useCookie('auth_token').value
      const userStr = useCookie('auth_user').value
      if (cookieToken) {
        this.token = cookieToken
      }
      if (userStr) {
        try {
          this.user = typeof userStr === 'string' ? JSON.parse(userStr) : userStr
        } catch {
          this.user = null
        }
      }
    },
    async login(username: string, password?: string) {
      this.loading = true
      try {
        const res = await $fetch<{ success: boolean; user: User; token: string }>('/api/auth/login', {
          method: 'POST',
          body: { username, password }
        })
        if (res.success) {
          this.token = res.token
          this.user = res.user
          useCookie('auth_token').value = res.token
          useCookie('auth_user').value = JSON.stringify(res.user)
          return true
        }
      } catch (err: any) {
        console.error('Login error:', err)
        throw err
      } finally {
        this.loading = false
      }
      return false
    },
    logout() {
      this.user = null
      this.token = null
      useCookie('auth_token').value = null
      useCookie('auth_user').value = null
      return navigateTo('/admin/login')
    }
  }
})
