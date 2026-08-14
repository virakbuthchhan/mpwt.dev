<template>
  <aside class="w-64 bg-gov-navy-dark text-slate-200 min-h-screen flex flex-col justify-between border-r border-gov-navy-light/40 shrink-0">
    <div>
      <!-- Header Branding -->
      <div class="p-6 border-b border-gov-navy-light/40 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gov-navy text-gov-gold flex items-center justify-center font-bold shadow-lg border border-gov-gold/40">
          <svg class="w-5 h-5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <h2 class="text-white font-bold text-sm tracking-tight">MPWT CMS</h2>
          <span class="text-[11px] text-gov-gold font-mono">mpwt.dev/admin</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="p-4 space-y-1.5 text-xs font-bold">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-gov-navy hover:text-gov-gold transition"
          active-class="bg-gov-navy text-gov-gold font-bold border-l-4 border-gov-gold shadow-md"
        >
          <component :is="item.icon" class="w-4 h-4 text-gov-gold shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- User Profile & Logout -->
    <div class="p-4 border-t border-gov-navy-light/40 space-y-3">
      <div v-if="user" class="flex items-center gap-3">
        <img :src="user.avatar" :alt="user.name" class="w-9 h-9 rounded-full object-cover border-2 border-gov-gold" />
        <div class="truncate">
          <div class="text-white font-bold text-xs truncate">{{ user.name }}</div>
          <span class="inline-block px-2 py-0.5 rounded text-[10px] bg-gov-navy text-gov-gold font-bold border border-gov-gold/40">
            {{ user.role }}
          </span>
        </div>
      </div>

      <button
        @click="logout"
        class="w-full py-2.5 bg-gov-navy hover:bg-rose-950 hover:text-rose-300 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-gov-navy-light/40"
      >
        <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>{{ $t('admin.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { h } from 'vue'

const { user, logout } = useAuth()

function createSvgIcon(d: string) {
  return () =>
    h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d })
    ])
}

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: createSvgIcon('M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z') },
  { path: '/admin/news', label: 'News & Notices', icon: createSvgIcon('M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z') },
  { path: '/admin/projects', label: 'IT Projects', icon: createSvgIcon('M13 10V3L4 14h7v7l9-11h-7z') },
  { path: '/admin/staff', label: 'Staff Directory', icon: createSvgIcon('M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z') },
  { path: '/admin/faq', label: 'FAQ Items', icon: createSvgIcon('M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z') },
  { path: '/admin/open-data', label: 'Open Datasets', icon: createSvgIcon('M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4') },
  { path: '/admin/technology', label: 'Tech Showcase', icon: createSvgIcon('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z') },
  { path: '/admin/settings', label: 'Settings & Inbox', icon: createSvgIcon('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z') }
]
</script>
