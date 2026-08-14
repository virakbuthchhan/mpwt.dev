<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Public Project Roadmap</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('projects.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('projects.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <!-- Status Tabs -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="st in statuses"
          :key="st"
          @click="selectedStatus = st"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition border',
            selectedStatus === st ? 'bg-gov-navy text-gov-gold border-gov-gold shadow' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-300'
          ]"
        >
          {{ getStatusLabel(st) }}
        </button>
      </div>

      <!-- Year Selector -->
      <div class="flex items-center gap-2 text-xs font-semibold text-slate-600">
        <span>Year:</span>
        <select
          v-model="selectedYear"
          class="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        >
          <option value="All">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="projectList.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
      No projects found matching the selected filters.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectCard v-for="proj in projectList" :key="proj.id" :project="proj" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue'

useSeoMeta({
  title: 'ប្រព័ន្ធតាមដានគម្រោង IT | IT Project Tracker - MPWT',
  description: 'Track active and completed IT development projects, roadmap, and progress across MPWT.'
})

const { t } = useI18n()
const selectedStatus = ref('All')
const selectedYear = ref('All')

const statuses = ['All', 'Planning', 'In Progress', 'Completed']

function getStatusLabel(st: string) {
  if (st === 'All') return t('projects.statusAll')
  if (st === 'Planning') return t('projects.statusPlanning')
  if (st === 'In Progress') return t('projects.statusInProgress')
  if (st === 'Completed') return t('projects.statusCompleted')
  return st
}

const { data, pending } = await useFetch<{ data: any[] }>('/api/projects', {
  query: computed(() => ({
    status: selectedStatus.value,
    year: selectedYear.value === 'All' ? undefined : selectedYear.value
  }))
})

const projectList = computed(() => data.value?.data || [])
</script>
