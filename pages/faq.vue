<template>
  <div class="py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Support Knowledgebase</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('faq.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('faq.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Search & Category Filter -->
    <div class="space-y-4">
      <div class="relative max-w-xl mx-auto">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('faq.searchPlaceholder')"
          class="w-full pl-10 pr-4 py-3 bg-white shadow-sm border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-gold"
        />
        <svg class="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Categories Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded-lg text-xs font-bold transition border',
            selectedCategory === cat ? 'bg-gov-navy text-gov-gold border-gov-gold shadow' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
          ]"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>
    </div>

    <!-- Accordion List -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 4" :key="i" class="h-16 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="faqList.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
      No FAQ items found matching your search.
    </div>

    <div v-else class="space-y-4">
      <FaqAccordion v-for="item in faqList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FaqAccordion from '~/components/FaqAccordion.vue'

useSeoMeta({
  title: 'សំណួរញឹកញាប់ | FAQ - MPWT',
  description: 'Frequently asked questions regarding driver licensing, vehicle inspections, ROAD CARE app, and IT support.'
})

const { t } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'General', 'Services', 'Support', 'OpenData']

function getCategoryLabel(cat: string) {
  if (cat === 'All') return t('faq.allCategories')
  if (cat === 'General') return t('faq.catGeneral')
  if (cat === 'Services') return t('faq.catServices')
  if (cat === 'Support') return t('faq.catSupport')
  if (cat === 'OpenData') return t('faq.catOpenData')
  return cat
}

const { data, pending } = await useFetch<{ data: any[] }>('/api/faq', {
  query: computed(() => ({
    search: searchQuery.value,
    category: selectedCategory.value === 'All' ? undefined : selectedCategory.value
  }))
})

const faqList = computed(() => data.value?.data || [])
</script>
