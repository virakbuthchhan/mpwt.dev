<template>
  <div class="space-y-8">
    <!-- Header Title Banner -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
          Dashboard Overview
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
          Welcome back, <strong class="text-gov-navy font-bold">{{ user?.name }}</strong> • logged in as <span class="bg-gov-gold/20 text-gov-navy px-2 py-0.5 rounded font-mono font-bold">{{ user?.role }}</span>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-300 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          System Online
        </span>
      </div>
    </div>

    <!-- Stats Grid (v-card style) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <AdminStatCard label="News Articles" :value="newsCount" />
      <AdminStatCard label="IT Projects" :value="projectsCount" />
      <AdminStatCard label="Staff Personnel" :value="staffCount" />
      <AdminStatCard label="Open Datasets" :value="datasetsCount" />
    </div>

    <!-- Recent Activity & Inbox Preview Grid (v-card style) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Recent News Table (v-card style) -->
      <div class="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>Recent Articles</span>
          </h3>
          <NuxtLink to="/admin/news" class="text-xs font-bold text-gov-navy hover:text-gov-gold transition flex items-center gap-1">
            <span>Manage All</span>
            <span>→</span>
          </NuxtLink>
        </div>

        <div class="space-y-3 text-xs">
          <div
            v-for="item in recentNews"
            :key="item.id"
            class="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl flex items-center justify-between gap-4 border border-slate-100 transition"
          >
            <div class="truncate space-y-0.5">
              <div class="font-bold text-slate-900 truncate font-khmer">{{ item.titleKh }}</div>
              <div class="text-slate-400 text-[11px] font-mono">{{ item.category }} • {{ item.publishedAt }}</div>
            </div>
            <span class="px-2.5 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg shrink-0">
              {{ item.views }} views
            </span>
          </div>
        </div>
      </div>

      <!-- Inquiry Messages Inbox (v-card style) -->
      <div class="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Inquiry Inbox</span>
          </h3>
          <NuxtLink to="/admin/settings" class="text-xs font-bold text-gov-navy hover:text-gov-gold transition flex items-center gap-1">
            <span>View Inbox</span>
            <span>→</span>
          </NuxtLink>
        </div>

        <div v-if="inquiries.length === 0" class="text-xs text-slate-400 py-6 text-center">
          No new messages in inbox.
        </div>

        <div v-else class="space-y-3 text-xs">
          <div
            v-for="inq in inquiries.slice(0, 3)"
            :key="inq.id"
            class="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl space-y-1 border border-slate-100 transition"
          >
            <div class="flex items-center justify-between font-bold text-slate-900">
              <span>{{ inq.name }}</span>
              <span class="text-[10px] text-slate-400 font-mono">{{ inq.createdAt }}</span>
            </div>
            <div class="text-gov-gold font-bold text-[11px] truncate">{{ inq.subject }}</div>
            <p class="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">{{ inq.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminStatCard from '~/components/admin/AdminStatCard.vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { user } = useAuth()

const { data: newsData } = await useFetch<{ data: any[] }>('/api/news')
const { data: projectsData } = await useFetch<{ data: any[] }>('/api/projects')
const { data: staffData } = await useFetch<{ data: any[] }>('/api/staff')
const { data: openData } = await useFetch<{ data: any[] }>('/api/open-data')
const { data: inquiriesData } = await useFetch<{ data: any[] }>('/api/inquiries')

const newsCount = computed(() => newsData.value?.data?.length || 0)
const projectsCount = computed(() => projectsData.value?.data?.length || 0)
const staffCount = computed(() => staffData.value?.data?.length || 0)
const datasetsCount = computed(() => openData.value?.data?.length || 0)

const recentNews = computed(() => newsData.value?.data?.slice(0, 4) || [])
const inquiries = computed(() => inquiriesData.value?.data || [])
</script>
