<template>
  <div class="py-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-10">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        System Search Engine
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        Search Portal
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans">
        Query news, tech systems, IT projects, staff directory, FAQ, and open datasets.
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Search input -->
    <div class="relative max-w-2xl mx-auto">
      <input
        v-model="queryStr"
        type="text"
        placeholder="Type to search system-wide..."
        class="w-full pl-12 pr-4 py-4 bg-white shadow-lg border border-slate-200 rounded-2xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-gold font-sans"
        @keyup.enter="triggerSearch"
      />
      <svg class="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div v-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-28 bg-slate-200 animate-pulse rounded-2xl"></div>
    </div>

    <div v-else-if="totalResults === 0 && queryStr" class="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium text-sm">
      No search results found for "{{ queryStr }}".
    </div>

    <!-- Grouped Results -->
    <div v-else-if="results" class="space-y-8">
      <!-- News Results -->
      <div v-if="results.news?.length" class="space-y-3">
        <h2 class="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span>News & Notices ({{ results.news.length }})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="item in results.news"
            :key="item.id"
            :to="`/news/${item.slug}`"
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-1 block"
          >
            <div class="text-xs text-gov-gold font-bold">{{ item.category }} • {{ item.publishedAt }}</div>
            <div class="font-bold text-sm text-slate-900 font-khmer">{{ locale === 'km' ? item.titleKh : item.titleEn }}</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Tech Results -->
      <div v-if="results.technology?.length" class="space-y-3">
        <h2 class="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Technology Systems ({{ results.technology.length }})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="item in results.technology"
            :key="item.id"
            to="/technology"
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-1 block"
          >
            <div class="text-xs text-gov-gold font-bold">{{ item.category }} • {{ item.status }}</div>
            <div class="font-bold text-sm text-slate-900">{{ item.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const queryStr = ref((route.query.q as string) || '')

const { data, pending, refresh } = await useFetch<{ data: any }>('/api/search', {
  query: computed(() => ({ q: queryStr.value }))
})

const results = computed(() => data.value?.data)

const totalResults = computed(() => {
  if (!results.value) return 0
  return (
    (results.value.news?.length || 0) +
    (results.value.technology?.length || 0) +
    (results.value.projects?.length || 0) +
    (results.value.staff?.length || 0)
  )
})

function triggerSearch() {
  router.push({ path: '/search', query: { q: queryStr.value } })
  refresh()
}
</script>
