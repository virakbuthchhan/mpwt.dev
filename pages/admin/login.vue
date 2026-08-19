<template>
  <div class="min-h-screen bg-gov-navy-dark flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

    <div class="w-full max-w-md bg-gov-navy/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gov-navy-light/60 space-y-6 relative z-10">
      <div class="text-center space-y-2">
        <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-1 mx-auto shadow-lg border-2 border-gov-gold overflow-hidden">
          <img src="/logo.png" alt="MPWT Logo" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">MPWT Admin CMS</h1>
        <p class="text-xs text-slate-300 font-mono">Department of IT Systems • mpwt.dev</p>
      </div>

      <div v-if="errorMsg" class="p-3.5 bg-rose-950/90 border border-rose-700 text-rose-200 rounded-xl text-xs font-bold text-center">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
          <BaseInput
            v-model="username"
            label="Username"
            placeholder="admin / editor / viewer"
            required
            icon="user"
            fontMono
            size="lg"
          />

          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            icon="lock"
            fontMono
            size="lg"
          />

          <BaseButton
            type="submit"
            variant="gold"
            size="lg"
            :loading="loading"
            class="w-full shadow-lg"
          >
            Sign In to Dashboard
          </BaseButton>
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
