<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition">
    <div class="space-y-1">
      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ label }}</span>
      <div class="text-3xl font-extrabold text-slate-900 font-mono">{{ value }}</div>
    </div>
    <div class="w-12 h-12 rounded-2xl bg-gov-navy/5 flex items-center justify-center text-gov-navy border border-gov-navy/10 shadow-inner">
      <svg class="w-6 h-6 text-gov-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="svgPath" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number | string
  icon?: string
}>()

const svgPath = computed(() => {
  if (props.label.includes('News')) return 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
  if (props.label.includes('Project')) return 'M13 10V3L4 14h7v7l9-11h-7z'
  if (props.label.includes('Staff')) return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  if (props.label.includes('Data')) return 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
  return 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
})
</script>
