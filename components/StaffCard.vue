<template>
  <div class="glass-card rounded-3xl shadow-sm border border-white/60 dark:border-slate-800 p-6 flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-1">
    <div class="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gov-gold/50 shadow-md group-hover:scale-105 transition duration-500">
      <img :src="staff.photo" :alt="name" class="w-full h-full object-cover" />
    </div>

    <div class="space-y-1 w-full">
      <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-gov-navy dark:group-hover:text-gov-gold transition font-khmer">
        {{ name }}
      </h3>
      <p class="text-xs font-bold text-gov-gold">
        {{ position }}
      </p>
      <p class="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1">
        <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0L9 14m3-3l3 3m-3-3v8" />
        </svg>
        <span>{{ unit }}</span>
      </p>
    </div>

    <div class="w-full pt-4 border-t border-slate-100/80 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
      <div class="flex items-center justify-center gap-2 truncate">
        <svg class="w-3.5 h-3.5 text-gov-navy dark:text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <a :href="`mailto:${staff.email}`" class="hover:underline truncate text-slate-700 dark:text-slate-300 font-mono text-[11px]">
          {{ staff.email }}
        </a>
      </div>

      <div class="flex items-center justify-center gap-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
        <svg class="w-3.5 h-3.5 text-gov-navy dark:text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
        </svg>
        <span>{{ staff.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StaffItem } from '~/server/utils/db'

const props = defineProps<{ staff: StaffItem }>()
const { locale } = useI18n()

const name = computed(() => (locale.value === 'km' ? props.staff.nameKh : props.staff.nameEn))
const position = computed(() => (locale.value === 'km' ? props.staff.positionKh : props.staff.positionEn))
const unit = computed(() => (locale.value === 'km' ? props.staff.unitKh : props.staff.unitEn))
</script>
