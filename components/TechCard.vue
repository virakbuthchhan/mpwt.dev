<template>
  <div class="glass-card rounded-3xl shadow-sm border border-white/60 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-1">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm">
            <img :src="item.logo" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-gov-navy dark:group-hover:text-gov-gold transition">
              {{ item.name }}
            </h3>
            <span class="text-[10px] text-gov-gold font-bold uppercase tracking-wider">
              {{ item.category }}
            </span>
          </div>
        </div>

        <span
          :class="[
            'px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider backdrop-blur-md',
            item.status === 'Live' ? 'bg-emerald-50/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' : '',
            item.status === 'In Development' ? 'bg-sky-50/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800' : '',
            item.status === 'Maintenance' ? 'bg-rose-50/80 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800' : ''
          ]"
        >
          {{ item.status }}
        </span>
      </div>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ description }}
      </p>

      <!-- Tech Stack Badges -->
      <div class="space-y-1.5">
        <span class="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
          {{ $t('technology.techStack') }}:
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in item.techStack"
            :key="tech"
            class="px-2.5 py-0.5 bg-slate-100/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-md text-[11px] font-mono border border-slate-200 dark:border-slate-700 font-semibold"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between text-xs">
      <span class="text-slate-400 font-mono text-[11px]">Launch: {{ item.launchYear }}</span>
      <a
        :href="item.systemUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gov-navy dark:text-gov-gold font-bold hover:text-gov-navy-light dark:hover:text-white transition inline-flex items-center gap-1.5 text-xs bg-white/80 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <span>Access System</span>
        <svg class="w-3.5 h-3.5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
