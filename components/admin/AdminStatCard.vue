<template>
  <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
    <div class="space-y-1">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ label }}</span>
      <div class="text-2xl font-extrabold text-slate-900 font-mono">{{ value }}</div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner text-gov-navy">
      {{ icon }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
  icon: string
}>()
</script>
