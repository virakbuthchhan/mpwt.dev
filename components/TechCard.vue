<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition group">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <img :src="item.logo" :alt="item.name" class="w-10 h-10 rounded-lg object-cover border border-slate-200" />
          <div>
            <h3 class="text-base font-bold text-slate-900 group-hover:text-gov-navy transition">
              {{ item.name }}
            </h3>
            <span class="text-[11px] text-gov-gold font-bold uppercase tracking-wider">
              {{ item.category }}
            </span>
          </div>
        </div>

        <span
          :class="[
            'px-2 py-0.5 rounded text-[11px] font-bold border',
            item.status === 'Live' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : '',
            item.status === 'In Development' ? 'bg-blue-50 text-blue-700 border-blue-300' : '',
            item.status === 'Maintenance' ? 'bg-rose-50 text-rose-700 border-rose-300' : ''
          ]"
        >
          {{ item.status }}
        </span>
      </div>

      <p class="text-xs text-slate-600 leading-relaxed">
        {{ description }}
      </p>

      <!-- Tech Stack Badges -->
      <div class="space-y-1">
        <span class="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
          {{ $t('technology.techStack') }}:
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in item.techStack"
            :key="tech"
            class="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono border border-slate-200"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
      <span class="text-slate-500 font-mono">Launch: {{ item.launchYear }}</span>
      <a
        :href="item.systemUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gov-navy font-bold hover:text-gov-gold transition inline-flex items-center gap-1"
      >
        <span>Access Platform</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TechItem } from '~/server/utils/db'

const props = defineProps<{ item: TechItem }>()
const { locale } = useI18n()

const description = computed(() => (locale.value === 'km' ? props.item.descriptionKh : props.item.descriptionEn))
</script>
