<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Department Specialists</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('staff.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('staff.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <div class="relative flex-1 min-w-[240px]">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('staff.searchPlaceholder')"
          class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div class="flex items-center gap-2">
        <select
          v-model="selectedUnit"
          class="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        >
          <option value="All">{{ $t('staff.allUnits') }}</option>
          <option value="Software Development Unit">Software Development Unit</option>
          <option value="Infrastructure & Network Unit">Infrastructure & Network Unit</option>
          <option value="Data Management & GIS Unit">Data Management & GIS Unit</option>
        </select>
      </div>
    </div>

    <!-- Staff Grid -->
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 4" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="staffList.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
      No staff members found matching your search.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <StaffCard v-for="staff in staffList" :key="staff.id" :staff="staff" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StaffCard from '~/components/StaffCard.vue'

useSeoMeta({
  title: 'បញ្ជីឈ្មោះមន្ត្រី | Staff Directory - MPWT',
  description: 'Official directory of technical specialists and IT personnel at DITS MPWT.'
})

const searchQuery = ref('')
const selectedUnit = ref('All')

const { data, pending } = await useFetch<{ data: any[] }>('/api/staff', {
  query: computed(() => ({
    search: searchQuery.value,
    unit: selectedUnit.value === 'All' ? undefined : selectedUnit.value
  }))
})

const staffList = computed(() => data.value?.data || [])
</script>
