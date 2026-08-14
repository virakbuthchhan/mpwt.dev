<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        Engineering Portfolio
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('technology.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('technology.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-5 py-2.5 rounded-xl text-xs font-bold transition border',
          selectedCategory === cat ? 'bg-gov-navy text-gov-gold border-gov-gold shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
        ]"
      >
        {{ cat === 'All' ? $t('technology.allCategories') : cat }}
      </button>
    </div>

    <!-- Technology Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-3xl"></div>
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
