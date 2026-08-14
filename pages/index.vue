<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner />

    <!-- Stats Counter Bar -->
    <section class="bg-gov-navy-dark text-white py-10 px-4 sm:px-8 border-b border-gov-gold/30">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="space-y-1">
          <div class="text-3xl sm:text-4xl font-extrabold text-gov-gold font-mono">14+</div>
          <div class="text-xs sm:text-sm text-slate-300 font-medium">{{ $t('home.stats.systems') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-4xl font-extrabold text-gov-gold font-mono">28+</div>
          <div class="text-xs sm:text-sm text-slate-300 font-medium">{{ $t('home.stats.projects') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-4xl font-extrabold text-gov-gold font-mono">45+</div>
          <div class="text-xs sm:text-sm text-slate-300 font-medium">{{ $t('home.stats.staff') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-4xl font-extrabold text-gov-gold font-mono">120+</div>
          <div class="text-xs sm:text-sm text-slate-300 font-medium">{{ $t('home.stats.datasets') }}</div>
        </div>
      </div>
    </section>

    <!-- Quick Links Grid -->
    <section class="max-w-7xl mx-auto py-12 px-4 sm:px-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
            {{ $t('home.quickLinks') }}
          </h2>
          <div class="w-12 h-1 bg-gov-gold mt-1 rounded"></div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.path"
          :to="link.path"
          class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-gov-gold hover:shadow-md transition text-center space-y-3 group"
        >
          <div class="w-12 h-12 rounded-xl bg-gov-surface text-gov-navy flex items-center justify-center text-2xl mx-auto group-hover:bg-gov-navy group-hover:text-gov-gold transition">
            {{ link.icon }}
          </div>
          <div class="text-xs font-bold text-slate-800 group-hover:text-gov-navy transition">
            {{ $t(link.label) }}
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Latest News Preview (3 cards) -->
    <section class="bg-slate-100 py-16 px-4 sm:px-8 border-y border-slate-200">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
              {{ $t('home.latestNews') }}
            </h2>
            <div class="w-12 h-1 bg-gov-gold mt-1 rounded"></div>
          </div>

          <NuxtLink
            to="/news"
            class="text-xs sm:text-sm font-bold text-gov-navy hover:text-gov-gold transition flex items-center gap-1"
          >
            <span>{{ $t('home.viewAllNews') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="newsPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard v-for="article in latestNews" :key="article.id" :article="article" />
        </div>
      </div>
    </section>

    <!-- IT Project Highlights -->
    <section class="max-w-7xl mx-auto py-16 px-4 sm:px-8 space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
            {{ $t('home.projectHighlights') }}
          </h2>
          <div class="w-12 h-1 bg-gov-gold mt-1 rounded"></div>
        </div>

        <NuxtLink
          to="/projects"
          class="text-xs sm:text-sm font-bold text-gov-navy hover:text-gov-gold transition flex items-center gap-1"
        >
          <span>{{ $t('home.viewAllProjects') }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard v-for="proj in featuredProjects" :key="proj.id" :project="proj" />
      </div>
    </section>

    <!-- Tech Showcase Teaser -->
    <section class="bg-gov-navy text-white py-16 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 space-y-4">
          <span class="text-gov-gold font-bold text-xs uppercase tracking-wider">MPWT Tech Portfolio</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-khmer leading-snug">
            {{ $t('home.techTeaserTitle') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {{ $t('home.techTeaserDesc') }}
          </p>
          <NuxtLink
            to="/technology"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gov-gold hover:bg-gov-gold-light text-gov-navy font-bold rounded-lg transition text-xs sm:text-sm shadow"
          >
            <span>{{ $t('home.viewAllTech') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TechCard v-for="tech in featuredTech" :key="tech.id" :item="tech" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '~/components/HeroBanner.vue'
import NewsCard from '~/components/NewsCard.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import TechCard from '~/components/TechCard.vue'

useSeoMeta({
  title: 'ទំព័រដើម | នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន - MPWT',
  ogTitle: 'Department of Information Technology Systems - MPWT',
  description: 'Official portal of the Department of Information Technology Systems, Directorate General of GDPTR, Ministry of Public Works and Transport.',
  ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
})

const { data: newsData, pending: newsPending } = await useFetch<{ data: any[] }>('/api/news')
const { data: projectsData } = await useFetch<{ data: any[] }>('/api/projects')
const { data: techData } = await useFetch<{ data: any[] }>('/api/technology')

const latestNews = computed(() => newsData.value?.data.slice(0, 3) || [])
const featuredProjects = computed(() => projectsData.value?.data.slice(0, 2) || [])
const featuredTech = computed(() => techData.value?.data.slice(0, 2) || [])

const quickLinks = [
  { path: '/services', label: 'nav.services', icon: '🛠️' },
  { path: '/technology', label: 'nav.technology', icon: '💻' },
  { path: '/projects', label: 'nav.projects', icon: '🚀' },
  { path: '/open-data', label: 'nav.openData', icon: '📊' },
  { path: '/staff', label: 'nav.staff', icon: '👤' },
  { path: '/faq', label: 'nav.faq', icon: '❓' }
]
</script>
