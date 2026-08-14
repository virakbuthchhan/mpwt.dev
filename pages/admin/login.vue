<template>
  <div class="min-h-screen bg-gov-navy-dark flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 border border-slate-700">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="w-16 h-16 rounded-2xl bg-gov-navy text-gov-gold flex items-center justify-center text-2xl font-bold mx-auto border-2 border-gov-gold shadow-lg">
          DITS
        </div>
        <h1 class="text-xl font-bold text-slate-900">
          {{ $t('admin.loginTitle') }}
        </h1>
        <p class="text-xs text-slate-500 font-medium">
          {{ $t('admin.loginSub') }}
        </p>
      </div>

      <!-- Quick Demo Login Roles Buttons -->
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
        <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
          {{ $t('admin.quickLogin') }}
        </span>
        <div class="grid grid-cols-3 gap-1.5 text-xs font-bold">
          <button
            @click="quickLogin('admin')"
            class="py-1.5 bg-gov-navy text-gov-gold rounded hover:bg-gov-navy-light transition shadow text-[11px]"
          >
            Super Admin
          </button>
          <button
            @click="quickLogin('editor')"
            class="py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow text-[11px]"
          >
            Editor
          </button>
          <button
            @click="quickLogin('viewer')"
            class="py-1.5 bg-slate-700 text-slate-200 rounded hover:bg-slate-800 transition shadow text-[11px]"
          >
            Viewer
          </button>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="p-3 bg-rose-50 border border-rose-300 text-rose-700 rounded-lg text-xs font-semibold">
        ⚠️ {{ errorMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4 text-xs sm:text-sm">
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">{{ $t('admin.username') }}</label>
          <input
            v-model="username"
            required
            type="text"
            placeholder="admin / editor / viewer"
            class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold font-mono"
          />
        </div>

        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">{{ $t('admin.password') }}</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold font-mono"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-gov-navy hover:bg-gov-navy-light text-white font-bold rounded-xl shadow-lg transition text-xs sm:text-sm"
        >
          <span v-if="loading">Authenticating...</span>
          <span v-else>{{ $t('admin.loginBtn') }}</span>
        </button>
      </form>

      <div class="text-center text-[11px] text-slate-400 font-mono">
        Official CMS Admin Portal • mpwt.dev
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Admin Login | MPWT IT Systems',
  robots: 'noindex, nofollow'
})

const username = ref('admin')
const password = ref('admin123')
const errorMessage = ref('')

const { login, loading } = useAuth()

async function handleLogin() {
  errorMessage.value = ''
  try {
    const success = await login(username.value, password.value)
    if (success) {
      navigateTo('/admin')
    }
  } catch (err: any) {
    errorMessage.value = err.statusMessage || 'Invalid credentials'
  }
}

function quickLogin(userRole: string) {
  username.value = userRole
  password.value = 'password'
  handleLogin()
}
</script>
