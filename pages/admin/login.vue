<template>
  <div class="min-h-screen bg-gov-navy-dark flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

    <div class="w-full max-w-md bg-gov-navy/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gov-navy-light/60 space-y-6 relative z-10">
      <div class="text-center space-y-2">
        <div class="w-14 h-14 rounded-2xl bg-gov-navy-dark text-gov-gold flex items-center justify-center mx-auto shadow-lg border-2 border-gov-gold">
          <svg class="w-7 h-7 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">MPWT Admin CMS</h1>
        <p class="text-xs text-slate-300 font-mono">Department of IT Systems • mpwt.dev</p>
      </div>

      <div v-if="errorMsg" class="p-3.5 bg-rose-950/90 border border-rose-700 text-rose-200 rounded-xl text-xs font-bold text-center">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4 text-xs">
        <div class="space-y-1.5">
          <label class="font-bold text-slate-200 block">Username</label>
          <input
            v-model="username"
            required
            type="text"
            placeholder="admin / editor / viewer"
            class="w-full p-3.5 bg-gov-navy-dark border border-gov-navy-light/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gov-gold font-mono"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-bold text-slate-200 block">Password</label>
          <input
            v-model="password"
            required
            type="password"
            placeholder="••••••••"
            class="w-full p-3.5 bg-gov-navy-dark border border-gov-navy-light/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gov-gold font-mono"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-4 bg-gov-gold hover:bg-gov-gold-light text-gov-navy font-bold rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
        >
          <span v-if="loading">Authenticating...</span>
          <span v-else>Sign In to Dashboard</span>
        </button>
      </form>

      <!-- Quick Demo Login Buttons -->
      <div class="pt-4 border-t border-gov-navy-light/40 space-y-2 text-[11px]">
        <div class="text-slate-300 font-bold text-center uppercase tracking-wider">Quick Demo Login</div>
        <div class="grid grid-cols-3 gap-2 font-mono">
          <button @click="fillDemo('admin', 'admin123')" class="p-2 bg-gov-navy-dark hover:bg-gov-navy text-gov-gold rounded-lg border border-gov-navy-light/50 font-bold truncate">
            Super Admin
          </button>
          <button @click="fillDemo('editor', 'password')" class="p-2 bg-gov-navy-dark hover:bg-gov-navy text-sky-300 rounded-lg border border-gov-navy-light/50 font-bold truncate">
            Editor
          </button>
          <button @click="fillDemo('viewer', 'password')" class="p-2 bg-gov-navy-dark hover:bg-gov-navy text-slate-300 rounded-lg border border-gov-navy-light/50 font-bold truncate">
            Viewer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: false })

const { login } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

function fillDemo(u: string, p: string) {
  username.value = u
  password.value = p
}

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  try {
    const success = await login(username.value, password.value)
    if (success) {
      router.push('/admin')
    } else {
      errorMsg.value = 'Invalid username or password'
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
