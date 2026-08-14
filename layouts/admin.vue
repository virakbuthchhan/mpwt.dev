<template>
  <div class="min-h-screen flex bg-slate-100 font-latin text-slate-900">
    <AdminSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Admin Top Navbar -->
      <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" target="_blank" class="text-xs text-gov-navy hover:text-gov-gold font-bold flex items-center gap-1">
            <span>🌐</span>
            <span>View Public Site (mpwt.dev)</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 text-xs font-semibold">
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
            🟢 Server Online
          </span>
          <span class="text-slate-500 font-mono">Role: {{ user?.role }}</span>
        </div>
      </header>

      <main class="p-6 flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
</script>
