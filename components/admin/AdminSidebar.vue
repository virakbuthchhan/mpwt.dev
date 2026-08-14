<template>
  <aside class="w-64 bg-gov-navy-dark text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0">
    <div>
      <!-- Header Branding -->
      <div class="p-6 border-b border-slate-800 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gov-gold text-gov-navy flex items-center justify-center font-bold shadow">
          IT
        </div>
        <div>
          <h2 class="text-white font-bold text-sm leading-snug">MPWT CMS</h2>
          <span class="text-[11px] text-gov-gold font-mono">mpwt.dev/admin</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="p-4 space-y-1.5 text-xs font-semibold">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-slate-800 hover:text-gov-gold transition"
          active-class="bg-gov-navy text-gov-gold font-bold border-l-4 border-gov-gold"
        >
          <span class="text-base">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- User Profile & Logout -->
    <div class="p-4 border-t border-slate-800 space-y-3">
      <div v-if="user" class="flex items-center gap-3">
        <img :src="user.avatar" :alt="user.name" class="w-9 h-9 rounded-full object-cover border border-gov-gold" />
        <div class="truncate">
          <div class="text-white font-bold text-xs truncate">{{ user.name }}</div>
          <span class="inline-block px-1.5 py-0.2 rounded text-[10px] bg-gov-navy text-gov-gold font-bold border border-gov-gold/40">
            {{ user.role }}
          </span>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full py-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <span>🚪</span>
        <span>{{ $t('admin.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/news', label: 'News & Notices', icon: '📰' },
  { path: '/admin/projects', label: 'IT Projects', icon: '🚀' },
  { path: '/admin/staff', label: 'Staff Directory', icon: '👥' },
  { path: '/admin/faq', label: 'FAQ Items', icon: '❓' },
  { path: '/admin/open-data', label: 'Open Datasets', icon: '📁' },
  { path: '/admin/technology', label: 'Tech Showcase', icon: '💻' },
  { path: '/admin/settings', label: 'Settings & Inbox', icon: '⚙️' }
]
</script>
