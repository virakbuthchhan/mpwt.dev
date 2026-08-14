<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        Project Roadmap
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('projects.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('projects.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="st in statuses"
          :key="st"
          @click="selectedStatus = st"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition border',
            selectedStatus === st ? 'bg-gov-navy text-gov-gold border-gov-gold shadow' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
          ]"
        >
          {{ getStatusLabel(st) }}
        </button>
      </div>

      <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
        <span>Year:</span>
        <select
          v-model="selectedYear"
          class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        >
          <option value="All">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-3xl"></div>
    </div>

    <div v-else-if="projectList.length === 0" class="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium text-sm">
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
