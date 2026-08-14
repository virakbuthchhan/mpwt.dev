<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col group">
    <div class="relative h-48 overflow-hidden bg-slate-100">
      <img
        :src="article.imageUrl"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <span class="absolute top-3 left-3 bg-gov-navy text-gov-gold text-[11px] font-bold px-2.5 py-1 rounded shadow">
        {{ article.category }}
      </span>
    </div>

    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-2">
        <div class="flex items-center text-xs text-slate-500 gap-3">
          <span>📅 {{ article.publishedAt }}</span>
          <span>•</span>
          <span>👁 {{ article.views }} views</span>
        </div>

        <h3 class="text-base font-bold text-slate-900 group-hover:text-gov-navy transition line-clamp-2 leading-snug">
          <NuxtLink :to="`/news/${article.slug}`">
            {{ title }}
          </NuxtLink>
        </h3>

        <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {{ excerpt }}
        </p>
      </div>

      <NuxtLink
        :to="`/news/${article.slug}`"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-gov-navy group-hover:text-gov-gold transition pt-2 border-t border-slate-100"
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

const title = computed(() =>
  locale.value === 'km' ? props.article.titleKh : props.article.titleEn
)

const excerpt = computed(() =>
  locale.value === 'km' ? props.article.excerptKh : props.article.excerptEn
)
</script>
