<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Engineering Portfolio</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('technology.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('technology.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Category Filter Tabs -->
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
        {{ cat === 'All' ? $t('technology.allCategories') : cat }}
      </button>
    </div>

    <!-- Technology Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TechCard v-for="item in techList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TechCard from '~/components/TechCard.vue'

useSeoMeta({
  title: 'ពិព័រណ៍បច្ចេកវិទ្យា | Technology Showcase - MPWT',
  description: 'Showcase of digital platforms, mobile applications, and infrastructure built by DITS MPWT.'
})

const selectedCategory = ref('All')
const categories = ['All', 'Web', 'Mobile', 'Infrastructure', 'Data']

const { data, pending } = await useFetch<{ data: any[] }>('/api/technology', {
  query: computed(() => ({ category: selectedCategory.value }))
})

const techList = computed(() => data.value?.data || [])
</script>
