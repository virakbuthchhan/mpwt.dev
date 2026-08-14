<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p class="text-xs text-slate-500">Welcome back, <strong class="text-gov-navy">{{ user?.name }}</strong> ({{ user?.role }})</p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/admin/news/new"
          class="px-4 py-2 bg-gov-navy text-white rounded-lg text-xs font-bold hover:bg-gov-navy-light transition shadow flex items-center gap-1.5"
        >
          <span>➕</span>
          <span>Publish Article</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <AdminStatCard label="Total News" :value="stats.news" icon="📰" />
      <AdminStatCard label="IT Projects" :value="stats.projects" icon="🚀" />
      <AdminStatCard label="Total Staff" :value="stats.staff" icon="👥" />
      <AdminStatCard label="Open Datasets" :value="stats.datasets" icon="📁" />
      <AdminStatCard label="Inquiries" :value="stats.inquiries" icon="✉️" />
    </div>

    <!-- Quick Management Action Modules -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
          <span>📰</span>
          <span>Content Management</span>
        </h3>
        <p class="text-xs text-slate-500">Create, edit, and publish press releases and announcements.</p>
        <NuxtLink to="/admin/news" class="block w-full py-2 bg-slate-100 hover:bg-slate-200 text-center font-bold text-xs text-slate-800 rounded-lg transition">
          Manage News →
        </NuxtLink>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
          <span>🚀</span>
          <span>Project Roadmap</span>
        </h3>
        <p class="text-xs text-slate-500">Track progress, timeline, and deliverables of IT projects.</p>
        <NuxtLink to="/admin/projects" class="block w-full py-2 bg-slate-100 hover:bg-slate-200 text-center font-bold text-xs text-slate-800 rounded-lg transition">
          Manage Projects →
        </NuxtLink>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
          <span>👥</span>
          <span>Staff Directory</span>
        </h3>
        <p class="text-xs text-slate-500">Update staff profiles, contact emails, and office units.</p>
        <NuxtLink to="/admin/staff" class="block w-full py-2 bg-slate-100 hover:bg-slate-200 text-center font-bold text-xs text-slate-800 rounded-lg transition">
          Manage Staff →
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Activity Feed & Contact Inquiries Snippet -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Recent Activity Feed -->
      <div class="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
          <span>⚡ Recent System Activity</span>
          <span class="text-xs font-mono text-slate-400">Live Log</span>
        </h3>

        <div class="space-y-3">
          <div v-for="act in activityLog" :key="act.id" class="flex items-start gap-3 text-xs border-b border-slate-50 pb-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              {{ act.icon }}
            </div>
            <div>
              <div class="font-bold text-slate-800">{{ act.action }}</div>
              <div class="text-slate-500 text-[11px]">{{ act.user }} • {{ act.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Inquiry Snippet -->
      <div class="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
          <span>📩 Contact Inbox</span>
          <NuxtLink to="/admin/settings" class="text-xs text-gov-navy font-bold hover:underline">View All</NuxtLink>
        </h3>

        <div v-if="inquiries.length === 0" class="text-xs text-slate-400 py-6 text-center">
          No pending inquiries.
        </div>

        <div v-else class="space-y-3">
          <div v-for="iq in inquiries.slice(0, 3)" :key="iq.id" class="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
            <div class="flex items-center justify-between font-bold text-slate-800">
              <span>{{ iq.name }}</span>
              <span class="text-[10px] text-slate-400 font-mono">{{ iq.createdAt }}</span>
            </div>
            <div class="text-gov-navy font-semibold">{{ iq.subject }}</div>
            <p class="text-slate-600 truncate">{{ iq.message }}</p>
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
const { data: datasetData } = await useFetch<{ data: any[] }>('/api/open-data')
const { data: inquiryData } = await useFetch<{ data: any[] }>('/api/inquiries')

const stats = computed(() => ({
  news: newsData.value?.data.length || 0,
  projects: projectsData.value?.data.length || 0,
  staff: staffData.value?.data.length || 0,
  datasets: datasetData.value?.data.length || 0,
  inquiries: inquiryData.value?.data.length || 0
}))

const inquiries = computed(() => inquiryData.value?.data || [])

const activityLog = [
  { id: 1, action: 'Published article "Driver License System Launch"', user: 'Super Admin', time: '10 mins ago', icon: '📰' },
  { id: 2, action: 'Updated Expressway ITS project progress to 85%', user: 'Content Editor', time: '1 hour ago', icon: '🚀' },
  { id: 3, action: 'Added open dataset "Vehicle Statistics 2025"', user: 'Super Admin', time: '3 hours ago', icon: '📁' },
  { id: 4, action: 'Updated staff contact directory', user: 'Content Editor', time: '1 day ago', icon: '👥' }
]
</script>
