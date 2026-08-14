<template>
  <form @submit.prevent="handleSearch" class="relative">
    <input
      v-model="query"
      type="text"
      :placeholder="$t('nav.search') + '...'"
      class="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full text-xs sm:text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-gold focus:border-transparent transition"
    />
    <button
      type="submit"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gov-navy transition"
      aria-label="Search"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </form>
</template>

<script setup lang="ts">
const query = ref('')

function handleSearch() {
  if (query.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(query.value.trim())}`)
  }
}
</script>
