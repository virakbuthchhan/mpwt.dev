<template>
  <div class="glass-card rounded-2xl border border-white/60 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition">
    <button
      @click="isOpen = !isOpen"
      class="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none bg-white/40 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-900/60 transition"
    >
      <div class="flex items-center gap-3">
        <span class="px-2.5 py-1 bg-gov-navy text-gov-gold rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 border border-gov-gold/30">
          {{ item.category }}
        </span>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug font-khmer">
          {{ question }}
        </h3>
      </div>

      <svg
        :class="['w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0', isOpen ? 'rotate-180 text-gov-navy dark:text-gov-gold' : '']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-show="isOpen" class="p-5 border-t border-slate-100/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 font-sans">
      {{ answer }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/server/utils/db'

const props = defineProps<{ item: FaqItem }>()
const { locale } = useI18n()
const isOpen = ref(false)

const question = computed(() => (locale.value === 'km' ? props.item.questionKh : props.item.questionEn))
const answer = computed(() => (locale.value === 'km' ? props.item.answerKh : props.item.answerEn))
</script>
