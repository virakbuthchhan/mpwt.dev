<template>
  <div class="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow transition">
    <button
      @click="isOpen = !isOpen"
      class="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none bg-slate-50/50 hover:bg-slate-100/80 transition"
    >
      <div class="flex items-center gap-3">
        <span class="px-2.5 py-1 bg-gov-navy text-gov-gold rounded text-[11px] font-bold uppercase shrink-0">
          {{ item.category }}
        </span>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {{ question }}
        </h3>
      </div>

      <svg
        :class="['w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0', isOpen ? 'rotate-180 text-gov-navy' : '']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-show="isOpen" class="p-5 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white">
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
