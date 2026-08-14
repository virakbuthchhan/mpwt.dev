<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Official Announcements</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('news.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('news.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Search Bar -->
    <div class="max-w-xl mx-auto">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('news.searchPlaceholder')"
          class="w-full pl-10 pr-4 py-3 bg-white shadow-sm border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        />
        <svg class="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- News Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="newsList.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
      No articles found matching your search.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NewsCard v-for="article in newsList" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsCard from '~/components/NewsCard.vue'

useSeoMeta({
  title: 'ព័ត៌មាន និងសេចក្តីប្រកាស | News & Notices - MPWT',
  description: 'Latest news, press releases, and IT system announcements from DITS MPWT.'
})

const searchQuery = ref('')

const { data, pending } = await useFetch<{ data: any[] }>('/api/news', {
  query: computed(() => ({ search: searchQuery.value }))
})

const newsList = computed(() => data.value?.data || [])
</script>
