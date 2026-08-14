<template>
  <div class="bg-slate-950 text-slate-200 py-2 px-4 border-b border-slate-800 text-xs font-medium overflow-hidden relative flex items-center">
    <div class="bg-gov-gold/20 text-gov-gold border border-gov-gold/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 mr-3 flex items-center gap-1.5 shadow-sm">
      <svg class="w-3.5 h-3.5 text-gov-gold animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <span>NOTICE</span>
    </div>
    <div class="overflow-hidden relative w-full">
      <div class="whitespace-nowrap inline-block animate-marquee hover:pause cursor-pointer text-slate-300 hover:text-white transition">
        {{ currentTickerText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
const { locale } = useI18n()
const siteStore = useSiteStore()

const currentTickerText = computed(() => {
  return locale.value === 'km'
    ? siteStore.announcementTickerKh
    : siteStore.announcementTickerEn
})
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  display: inline-block;
  animation: marquee 25s linear infinite;
}
.hover\:pause:hover {
  animation-play-state: paused;
}
</style>
