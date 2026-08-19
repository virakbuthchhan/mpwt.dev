<template>
  <div class="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
    <!-- Admin Sidebar (v-navigation-drawer style) -->
    <AdminSidebar />

    <!-- Main Admin Workspace -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Admin Utility Bar (v-app-bar style) -->
      <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-xs font-bold text-gov-navy hover:text-gov-navy-light flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 px-3.5 py-2 rounded-xl transition shadow-xs border border-slate-200/60"
          >
            <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Public Website</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 text-xs font-bold">
          <!-- Role Chip (v-chip style) -->
          <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-slate-600 dark:text-slate-300 text-[11px] uppercase tracking-wider">
              Role: <strong class="text-gov-navy dark:text-gov-gold">{{ user?.role }}</strong>
            </span>
          </div>

          <div class="text-slate-400 font-mono text-[11px] hidden sm:block">
            mpwt.dev/admin
          </div>
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
