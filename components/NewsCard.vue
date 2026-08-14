<template>
  <div class="glass-card rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/60 dark:border-slate-800 flex flex-col justify-between group transform hover:-translate-y-1">
    <div>
      <div class="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          :src="article.imageUrl"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <span class="absolute top-3.5 left-3.5 bg-gov-navy/90 backdrop-blur-md text-gov-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-gov-gold/40">
          {{ article.category }}
        </span>
      </div>

      <div class="p-6 space-y-3">
        <div class="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-4 font-mono">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ article.publishedAt }}
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ article.views }} views
          </span>
        </div>

        <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-gov-gold transition line-clamp-2 leading-snug font-khmer">
          <NuxtLink :to="`/news/${article.slug}`">
            {{ title }}
          </NuxtLink>
        </h3>

        <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {{ excerpt }}
        </p>
      </div>
    </div>

    <div class="px-6 pb-6 pt-3 border-t border-slate-100/80 dark:border-slate-800">
      <NuxtLink
        :to="`/news/${article.slug}`"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-gov-navy dark:text-gov-gold group-hover:text-gov-gold transition"
      >
        <span>{{ $t('services.learnMore') }}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/server/utils/db'

const props = defineProps<{ article: NewsItem }>()
const { locale } = useI18n()

const title = computed(() => (locale.value === 'km' ? props.article.titleKh : props.article.titleEn))
const excerpt = computed(() => (locale.value === 'km' ? props.article.excerptKh : props.article.excerptEn))
</script>
