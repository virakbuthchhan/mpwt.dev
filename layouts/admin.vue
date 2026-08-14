<template>
  <div class="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
    <!-- Admin Sidebar -->
    <AdminSidebar />

    <!-- Main Admin Workspace -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Admin Utility Bar -->
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-xs font-bold text-gov-navy dark:text-gov-gold hover:underline flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Public Website</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 text-xs font-bold">
          <span class="text-slate-500 font-mono">Role: {{ user?.role }}</span>
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
      </header>

      <!-- Admin Page Content -->
      <main class="p-6 sm:p-8 flex-1">
        <slot />
      </main>
    </div>

    <!-- Settings Drawer -->
    <SettingsDrawer />
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import SettingsDrawer from '~/components/SettingsDrawer.vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
</script>
