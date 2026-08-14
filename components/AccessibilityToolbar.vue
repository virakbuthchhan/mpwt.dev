<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Floating Accessibility Trigger -->
    <button
      @click="isOpen = !isOpen"
      class="w-13 h-13 rounded-2xl bg-gov-navy text-gov-gold p-3.5 shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gov-gold/50 border-2 border-gov-gold flex items-center justify-center transition-all duration-300 group"
      aria-label="Accessibility Settings"
      title="Accessibility Options"
    >
      <svg class="w-6 h-6 text-gov-gold group-hover:rotate-12 transition transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </button>

    <!-- Control Panel Flyout -->
    <div
      v-if="isOpen"
      class="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 text-slate-900 animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 class="font-bold text-sm text-gov-navy flex items-center gap-2">
          <svg class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{{ $t('accessibility.title') }}</span>
        </h3>
        <button @click="isOpen = false" class="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
      </div>

      <!-- Font Size Scaling -->
      <div class="space-y-2">
        <div class="text-xs font-bold text-slate-700 flex justify-between">
          <span>{{ $t('accessibility.fontSize') }}</span>
          <span class="text-gov-navy font-mono">{{ (fontScale * 100).toFixed(0) }}%</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="decreaseFontSize"
            class="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition border border-slate-300"
          >
            A-
          </button>
          <button
            @click="resetSettings"
            class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs transition font-bold"
          >
            Default
          </button>
          <button
            @click="increaseFontSize"
            class="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm transition border border-slate-300"
          >
            A+
          </button>
        </div>
      </div>

      <!-- High Contrast Toggle -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <span class="text-xs font-bold text-slate-700">{{ $t('accessibility.highContrast') }}</span>
        <button
          @click="toggleHighContrast"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition border',
            highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-slate-100 text-slate-700 border-slate-300'
          ]"
        >
          {{ highContrast ? $t('accessibility.on') : $t('accessibility.off') }}
        </button>
      </div>

      <!-- Dyslexia Font Toggle -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <span class="text-xs font-bold text-slate-700">{{ $t('accessibility.dyslexiaFont') }}</span>
        <button
          @click="toggleDyslexiaFont"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition border',
            dyslexiaFont ? 'bg-gov-navy text-gov-gold border-gov-gold' : 'bg-slate-100 text-slate-700 border-slate-300'
          ]"
        >
          {{ dyslexiaFont ? $t('accessibility.on') : $t('accessibility.off') }}
        </button>
      </div>

      <!-- Reset -->
      <button
        @click="resetSettings"
        class="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition border border-rose-200 mt-2"
      >
        {{ $t('accessibility.reset') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccessibilityStore } from '~/stores/accessibility'

const store = useAccessibilityStore()
const isOpen = ref(false)

const fontScale = computed(() => store.fontScale)
const highContrast = computed(() => store.highContrast)
const dyslexiaFont = computed(() => store.dyslexiaFont)

function increaseFontSize() {
  store.increaseFontSize()
}

function decreaseFontSize() {
  store.decreaseFontSize()
}

function toggleHighContrast() {
  store.toggleHighContrast()
}

function toggleDyslexiaFont() {
  store.toggleDyslexiaFont()
}

function resetSettings() {
  store.resetSettings()
}

onMounted(() => {
  store.initAccessibility()
})
</script>
