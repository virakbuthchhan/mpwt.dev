<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner />

    <!-- High-Tech Metrics Bar -->
    <section class="bg-gov-navy-dark text-white py-12 px-4 sm:px-8 border-b border-gov-navy-light/40">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="space-y-1">
          <div class="text-3xl sm:text-5xl font-extrabold text-gov-gold font-mono">14+</div>
          <div class="text-xs sm:text-sm text-slate-200 font-bold uppercase tracking-wider">{{ $t('home.stats.systems') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-5xl font-extrabold text-gov-gold font-mono">28+</div>
          <div class="text-xs sm:text-sm text-slate-200 font-bold uppercase tracking-wider">{{ $t('home.stats.projects') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-5xl font-extrabold text-gov-gold font-mono">45+</div>
          <div class="text-xs sm:text-sm text-slate-200 font-bold uppercase tracking-wider">{{ $t('home.stats.staff') }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-3xl sm:text-5xl font-extrabold text-gov-gold font-mono">120+</div>
          <div class="text-xs sm:text-sm text-slate-200 font-bold uppercase tracking-wider">{{ $t('home.stats.datasets') }}</div>
        </div>
      </div>
    </section>

    <!-- Quick Links Grid (Redesigned Glassmorphism Cards) -->
    <section class="max-w-7xl mx-auto py-16 px-4 sm:px-8 space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-khmer">
            {{ $t('home.quickLinks') }}
          </h2>
          <div class="w-16 h-1 bg-gov-gold mt-1.5 rounded-full"></div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.path"
          :to="link.path"
          class="glass-card p-6 rounded-3xl border border-white/80 dark:border-slate-800 hover:border-gov-gold/70 shadow-sm hover:shadow-2xl transition-all duration-500 text-center space-y-3.5 group transform hover:-translate-y-1.5 relative overflow-hidden"
        >
          <!-- Subtle Glow Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-b from-gov-gold/0 via-gov-gold/0 to-gov-gold/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

          <!-- Fixed Square Icon Badge -->
          <div class="w-12 h-12 rounded-2xl bg-gov-navy/10 dark:bg-gov-navy/30 text-gov-navy dark:text-gov-gold flex items-center justify-center mx-auto group-hover:bg-gov-navy group-hover:text-gov-gold transition duration-500 shadow-sm border border-gov-navy/15 dark:border-gov-navy-light/40 shrink-0">
            <component :is="link.icon" class="w-6 h-6 text-current" />
          </div>

          <!-- Label -->
          <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-gov-navy dark:group-hover:text-gov-gold transition font-khmer leading-snug">
            {{ $t(link.label) }}
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="bg-slate-100/70 dark:bg-slate-900/40 py-16 px-4 sm:px-8 border-y border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-khmer">
              {{ $t('home.latestNews') }}
            </h2>
            <div class="w-16 h-1 bg-gov-gold mt-1.5 rounded-full"></div>
          </div>

          <NuxtLink
            to="/news"
            class="text-xs sm:text-sm font-bold text-gov-navy dark:text-gov-gold hover:text-gov-navy-light transition flex items-center gap-1.5 bg-white/80 dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <span>{{ $t('home.viewAllNews') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="newsPending" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-72 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard v-for="article in latestNews" :key="article.id" :article="article" />
        </div>
      </div>
    </section>

    <!-- Project Highlights -->
    <section class="max-w-7xl mx-auto py-16 px-4 sm:px-8 space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-khmer">
            {{ $t('home.projectHighlights') }}
          </h2>
          <div class="w-16 h-1 bg-gov-gold mt-1.5 rounded-full"></div>
        </div>

        <NuxtLink
          to="/projects"
          class="text-xs sm:text-sm font-bold text-gov-navy dark:text-gov-gold hover:text-gov-navy-light transition flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
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
    <section class="bg-gov-navy text-white py-20 px-4 sm:px-8 relative overflow-hidden">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div class="lg:col-span-5 space-y-5">
          <span class="text-gov-gold font-bold text-xs uppercase tracking-widest bg-gov-navy-dark px-3 py-1 rounded-full border border-gov-gold/30">
            MPWT Technology Stack
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold font-khmer leading-snug">
            {{ $t('home.techTeaserTitle') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {{ $t('home.techTeaserDesc') }}
          </p>
          <NuxtLink
            to="/technology"
            class="inline-flex items-center gap-2 px-7 py-3.5 bg-gov-gold hover:bg-gov-gold-light text-gov-navy font-bold rounded-xl transition text-xs sm:text-sm shadow-xl"
          >
            <span>{{ $t('home.viewAllTech') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
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
import { h } from 'vue'

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

function createSvgIcon(d: string) {
  return () =>
    h('svg', { class: 'w-6 h-6 text-current transition duration-300', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d })
    ])
}

const quickLinks = [
  { path: '/services', label: 'nav.services', icon: createSvgIcon('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z') },
  { path: '/technology', label: 'nav.technology', icon: createSvgIcon('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z') },
  { path: '/projects', label: 'nav.projects', icon: createSvgIcon('M13 10V3L4 14h7v7l9-11h-7z') },
  { path: '/open-data', label: 'nav.openData', icon: createSvgIcon('M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4') },
  { path: '/staff', label: 'nav.staff', icon: createSvgIcon('M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z') },
  { path: '/faq', label: 'nav.faq', icon: createSvgIcon('M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z') }
]
</script>
