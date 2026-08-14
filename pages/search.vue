<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Search Bar & Title -->
    <div class="space-y-4 max-w-2xl mx-auto text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-gov-navy font-khmer">
        {{ $t('search.title') }}
      </h1>
      <SearchBar class="w-full shadow-md" />
      <p v-if="searchQuery" class="text-xs text-slate-500">
        {{ $t('search.queryFor') }}: <strong class="text-gov-navy font-mono">"{{ searchQuery }}"</strong>
      </p>
    </div>

    <div v-if="pending" class="space-y-4 max-w-4xl mx-auto">
      <div v-for="i in 4" :key="i" class="h-20 bg-slate-200 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="!hasResults" class="text-center py-16 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm max-w-xl mx-auto">
      {{ $t('search.noResults') }}
    </div>

    <div v-else class="space-y-12 max-w-5xl mx-auto">
      <!-- News Results -->
      <section v-if="results.news?.length" class="space-y-4">
        <h2 class="text-lg font-bold text-gov-navy border-b border-gov-gold/40 pb-2 flex items-center gap-2">
          <span>📰</span>
          <span>{{ $t('search.news') }} ({{ results.news.length }})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NewsCard v-for="n in results.news" :key="n.id" :article="n" />
        </div>
      </section>

      <!-- Projects Results -->
      <section v-if="results.projects?.length" class="space-y-4">
        <h2 class="text-lg font-bold text-gov-navy border-b border-gov-gold/40 pb-2 flex items-center gap-2">
          <span>🚀</span>
          <span>{{ $t('search.projects') }} ({{ results.projects.length }})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard v-for="p in results.projects" :key="p.id" :project="p" />
        </div>
      </section>

      <!-- Staff Results -->
      <section v-if="results.staff?.length" class="space-y-4">
        <h2 class="text-lg font-bold text-gov-navy border-b border-gov-gold/40 pb-2 flex items-center gap-2">
          <span>👥</span>
          <span>{{ $t('search.staff') }} ({{ results.staff.length }})</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StaffCard v-for="s in results.staff" :key="s.id" :staff="s" />
        </div>
      </section>

      <!-- Tech Results -->
      <section v-if="results.technology?.length" class="space-y-4">
        <h2 class="text-lg font-bold text-gov-navy border-b border-gov-gold/40 pb-2 flex items-center gap-2">
          <span>💻</span>
          <span>Tech Systems ({{ results.technology.length }})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TechCard v-for="tItem in results.technology" :key="tItem.id" :item="tItem" />
        </div>
      </section>

      <!-- FAQ Results -->
      <section v-if="results.faq?.length" class="space-y-4">
        <h2 class="text-lg font-bold text-gov-navy border-b border-gov-gold/40 pb-2 flex items-center gap-2">
          <span>❓</span>
          <span>{{ $t('search.faq') }} ({{ results.faq.length }})</span>
        </h2>
        <div class="space-y-3">
          <FaqAccordion v-for="f in results.faq" :key="f.id" :item="f" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue'
import NewsCard from '~/components/NewsCard.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import StaffCard from '~/components/StaffCard.vue'
import TechCard from '~/components/TechCard.vue'
import FaqAccordion from '~/components/FaqAccordion.vue'

const route = useRoute()

useSeoMeta({
  title: 'ស្វែងរក | Search Results - MPWT',
  description: 'Global search results across news, services, staff, FAQ, projects, and datasets.'
})

const searchQuery = computed(() => (route.query.q as string) || '')

const { data, pending } = await useFetch<{ results: any }>(`/api/search`, {
  query: computed(() => ({ q: searchQuery.value }))
})

const results = computed(() => data.value?.results || {})

const hasResults = computed(() => {
  const r = results.value
  return (
    (r.news && r.news.length > 0) ||
    (r.projects && r.projects.length > 0) ||
    (r.staff && r.staff.length > 0) ||
    (r.technology && r.technology.length > 0) ||
    (r.faq && r.faq.length > 0) ||
    (r.openData && r.openData.length > 0)
  )
})
</script>
