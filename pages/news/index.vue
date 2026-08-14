<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        News & Press Releases
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('news.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('news.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
      <div class="relative flex-1 min-w-[220px]">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('news.searchPlaceholder')"
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold font-sans"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div class="flex items-center gap-2">
        <select
          v-model="selectedCategory"
          class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        >
          <option value="All">{{ $t('news.allCategories') }}</option>
          <option value="Events">{{ $t('news.catEvents') }}</option>
          <option value="Notices">{{ $t('news.catNotices') }}</option>
          <option value="Press">{{ $t('news.catPress') }}</option>
        </select>
      </div>
    </div>

    <!-- News Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-80 bg-slate-200 animate-pulse rounded-3xl"></div>
    </div>

    <div v-else-if="newsList.length === 0" class="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium text-sm">
      No articles found matching your query.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NewsCard v-for="article in newsList" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NewsCard from '~/components/NewsCard.vue'

useSeoMeta({
  title: 'ព័ត៌មាន និងសេចក្តីជូនដំណឹង | News - MPWT',
  description: 'Latest official announcements, tech events, and press releases from DITS MPWT.'
})

const searchQuery = ref('')
const selectedCategory = ref('All')

const { data, pending } = await useFetch<{ data: any[] }>('/api/news', {
  query: computed(() => ({
    search: searchQuery.value,
    category: selectedCategory.value === 'All' ? undefined : selectedCategory.value
  }))
})

const newsList = computed(() => data.value?.data || [])
</script>
