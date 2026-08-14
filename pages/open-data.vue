<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Transparency & Open Datasets</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('openData.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('openData.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-[200px]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search datasets..."
          class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Format Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-600">Format:</span>
        <select
          v-model="selectedFormat"
          class="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        >
          <option value="All">All Formats</option>
          <option value="CSV">CSV</option>
          <option value="JSON">JSON</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
    </div>

    <!-- Datasets List Grid -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-32 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="datasetList.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
      No open datasets found matching your criteria.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in datasetList"
        :key="item.id"
        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition"
      >
        <div class="space-y-2 flex-1">
          <div class="flex items-center gap-3">
            <span
              :class="[
                'px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border',
                item.format === 'CSV' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : '',
                item.format === 'JSON' ? 'bg-blue-50 text-blue-700 border-blue-300' : '',
                item.format === 'PDF' ? 'bg-rose-50 text-rose-700 border-rose-300' : ''
              ]"
            >
              {{ item.format }}
            </span>
            <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">{{ item.category }}</span>
            <span class="text-xs text-slate-400">• {{ item.fileSize }}</span>
          </div>

          <h3 class="text-base font-bold text-slate-900 leading-snug">
            {{ locale === 'km' ? item.titleKh : item.titleEn }}
          </h3>

          <p class="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {{ locale === 'km' ? item.descriptionKh : item.descriptionEn }}
          </p>

          <div class="text-[11px] text-slate-400 font-mono pt-1">
            {{ $t('openData.lastUpdated') }}: {{ item.lastUpdated }} | {{ $t('openData.downloadsCount') }}: {{ item.downloads }}
          </div>
        </div>

        <button
          @click="downloadDataset(item)"
          class="px-5 py-2.5 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shrink-0 shadow"
        >
          <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{{ $t('openData.download') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatasetItem } from '~/server/utils/db'

useSeoMeta({
  title: 'ច្រកទិន្នន័យបើកទូលាយ | Open Data Portal - MPWT',
  description: 'Public datasets, statistics, and transport technical reports published by DITS MPWT.'
})

const { locale } = useI18n()
const searchQuery = ref('')
const selectedFormat = ref('All')

const { data, pending } = await useFetch<{ data: DatasetItem[] }>('/api/open-data', {
  query: computed(() => ({
    search: searchQuery.value,
    format: selectedFormat.value === 'All' ? undefined : selectedFormat.value
  }))
})

const datasetList = computed(() => data.value?.data || [])

function downloadDataset(item: DatasetItem) {
  // Simulate download file creation
  const textContent = `MPWT Open Data Export - ${item.titleEn}\nFormat: ${item.format}\nDate: ${item.lastUpdated}\nCategory: ${item.category}\n`
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${item.id}-${item.format.toLowerCase()}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
</script>
