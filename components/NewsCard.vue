<template>
  <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col justify-between group">
    <div>
      <div class="relative h-52 overflow-hidden bg-slate-100">
        <img
          :src="article.imageUrl"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <span class="absolute top-3.5 left-3.5 bg-gov-navy text-gov-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow border border-gov-gold/40">
          {{ article.category }}
        </span>
      </div>

      <div class="p-6 space-y-3">
        <div class="flex items-center text-xs text-slate-400 gap-4 font-mono">
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

        <h3 class="text-base font-bold text-slate-900 group-hover:text-sky-600 transition line-clamp-2 leading-snug font-khmer">
          <NuxtLink :to="`/news/${article.slug}`">
            {{ title }}
          </NuxtLink>
        </h3>

        <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {{ excerpt }}
        </p>
      </div>
    </div>

    <div class="px-6 pb-6 pt-2 border-t border-slate-100">
      <NuxtLink
        :to="`/news/${article.slug}`"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-gov-navy group-hover:text-gov-gold transition"
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
