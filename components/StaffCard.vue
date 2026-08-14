<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition group">
    <div class="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gov-gold/40 shadow group-hover:scale-105 transition">
      <img :src="staff.photo" :alt="name" class="w-full h-full object-cover" />
    </div>

    <div class="space-y-1 w-full">
      <h3 class="text-base font-bold text-slate-900 group-hover:text-gov-navy transition">
        {{ name }}
      </h3>
      <p class="text-xs font-semibold text-gov-gold">
        {{ position }}
      </p>
      <p class="text-xs text-slate-500 font-medium">
        🏛 {{ unit }}
      </p>
    </div>

    <div class="w-full pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
      <div class="flex items-center justify-center gap-1.5 truncate">
        <svg class="w-3.5 h-3.5 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <a :href="`mailto:${staff.email}`" class="hover:underline truncate text-slate-700">
          {{ staff.email }}
        </a>
      </div>
      <div class="flex items-center justify-center gap-1.5 font-mono text-[11px] text-slate-500">
        <svg class="w-3.5 h-3.5 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
