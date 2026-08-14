<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Floating Trigger Button -->
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 rounded-2xl bg-gov-navy text-gov-gold p-3.5 shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gov-gold/50 border-2 border-gov-gold flex items-center justify-center transition-all duration-300 group"
      aria-label="Open Settings Drawer"
      title="Customize Theme & Display"
    >
      <svg class="w-6 h-6 text-gov-gold group-hover:rotate-45 transition duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    </button>

    <!-- Modal Backdrop Overlay -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
    ></div>

    <!-- Right Slide-Over Settings Drawer -->
    <aside
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 font-sans"
    >
      <!-- Drawer Header -->
      <div class="p-6 bg-gov-navy text-white flex items-center justify-between border-b border-gov-navy-dark shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gov-gold/20 text-gov-gold flex items-center justify-center border border-gov-gold/40">
            <svg class="w-5 h-5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-base text-white">Display & Theme</h3>
            <span class="text-[11px] text-gov-gold font-mono">Personal Preferences</span>
          </div>
        </div>

        <button
          @click="isOpen = false"
          class="w-8 h-8 rounded-lg bg-gov-navy-dark hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition"
        >
          ✕
        </button>
      </div>

      <!-- Settings Form Controls -->
      <div class="p-6 space-y-7 text-xs text-slate-800 dark:text-slate-200">
        <!-- 1. Theme Mode (Light / Dark / System) -->
        <div class="space-y-2.5">
          <label class="font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400 block">
            Appearance Mode
          </label>
          <div class="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              @click="setThemeMode('light')"
              :class="[
                'py-2 px-3 rounded-xl font-bold transition flex flex-col items-center gap-1.5',
                themeMode === 'light' ? 'bg-white dark:bg-slate-900 text-gov-navy dark:text-gov-gold shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              ]"
            >
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Light</span>
            </button>

            <button
              @click="setThemeMode('dark')"
              :class="[
                'py-2 px-3 rounded-xl font-bold transition flex flex-col items-center gap-1.5',
                themeMode === 'dark' ? 'bg-white dark:bg-slate-900 text-gov-navy dark:text-gov-gold shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              ]"
            >
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>Dark</span>
            </button>

            <button
              @click="setThemeMode('system')"
              :class="[
                'py-2 px-3 rounded-xl font-bold transition flex flex-col items-center gap-1.5',
                themeMode === 'system' ? 'bg-white dark:bg-slate-900 text-gov-navy dark:text-gov-gold shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              ]"
            >
              <svg class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>System</span>
            </button>
          </div>
        </div>

        <!-- 2. Primary Theme Color Palette -->
        <div class="space-y-2.5">
          <label class="font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400 block">
            Theme Brand Color
          </label>
          <div class="grid grid-cols-4 gap-2.5">
            <button
              v-for="color in themeColors"
              :key="color.hex"
              @click="setThemeColor(color.hex)"
              :style="{ backgroundColor: color.hex }"
              :class="[
                'h-11 rounded-2xl flex items-center justify-center text-white transition transform hover:scale-105 border-2 shadow-sm',
                themeColor === color.hex ? 'border-gov-gold ring-2 ring-gov-gold/50' : 'border-transparent'
              ]"
              :title="color.label"
            >
              <svg v-if="themeColor === color.hex" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 3. Font Family Selector -->
        <div class="space-y-2.5">
          <label class="font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400 block">
            Font Family Style
          </label>
          <div class="space-y-2">
            <button
              v-for="font in fontFamilies"
              :key="font.id"
              @click="setFontFamily(font.id)"
              :class="[
                'w-full p-3 rounded-2xl font-semibold border text-left flex items-center justify-between transition',
                fontFamily === font.id
                  ? 'bg-gov-navy text-white border-gov-gold shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 border-slate-200 dark:border-slate-700'
              ]"
            >
              <div>
                <div class="font-bold text-xs">{{ font.name }}</div>
                <div class="text-[11px] opacity-75 font-mono">{{ font.desc }}</div>
              </div>
              <svg v-if="fontFamily === font.id" class="w-4 h-4 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 4. Font Size Scale -->
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400">
              Font Scale
            </label>
            <span class="font-mono text-gov-navy dark:text-gov-gold font-bold">
              {{ (fontScale * 100).toFixed(0) }}%
            </span>
          </div>

          <div class="grid grid-cols-4 gap-2 font-bold font-mono">
            <button
              @click="setFontSizeLevel(0)"
              :class="[
                'py-2 rounded-xl text-[11px] border transition',
                fontSizeLevel === 0 ? 'bg-gov-navy text-gov-gold border-gov-gold' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              90%
            </button>
            <button
              @click="setFontSizeLevel(1)"
              :class="[
                'py-2 rounded-xl text-[11px] border transition',
                fontSizeLevel === 1 ? 'bg-gov-navy text-gov-gold border-gov-gold' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              100%
            </button>
            <button
              @click="setFontSizeLevel(2)"
              :class="[
                'py-2 rounded-xl text-[11px] border transition',
                fontSizeLevel === 2 ? 'bg-gov-navy text-gov-gold border-gov-gold' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              115%
            </button>
            <button
              @click="setFontSizeLevel(3)"
              :class="[
                'py-2 rounded-xl text-[11px] border transition',
                fontSizeLevel === 3 ? 'bg-gov-navy text-gov-gold border-gov-gold' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              130%
            </button>
          </div>
        </div>

        <!-- 5. Language Selection -->
        <div class="space-y-2.5">
          <label class="font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400 block">
            Language / ភាសា
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="switchLanguage('km')"
              :class="[
                'py-2.5 px-3 rounded-2xl font-bold transition flex items-center justify-center gap-2 border',
                locale === 'km' ? 'bg-gov-navy text-gov-gold border-gov-gold shadow' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              <span>🇰🇭</span>
              <span>ភាសាខ្មែរ</span>
            </button>

            <button
              @click="switchLanguage('en')"
              :class="[
                'py-2.5 px-3 rounded-2xl font-bold transition flex items-center justify-center gap-2 border',
                locale === 'en' ? 'bg-gov-navy text-gov-gold border-gov-gold shadow' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              ]"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

        <!-- 6. High Contrast Option -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <span class="font-bold text-slate-700 dark:text-slate-300">High Contrast Vision</span>
          <button
            @click="toggleHighContrast"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition border',
              highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            ]"
          >
            {{ highContrast ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <button
          @click="resetSettings"
          class="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl text-xs font-bold transition border border-rose-200 shadow-sm"
        >
          Reset All Defaults
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useAccessibilityStore, type FontFamily, type ThemeMode, type ThemeColor } from '~/stores/accessibility'

const { locale, setLocale } = useI18n()
const store = useAccessibilityStore()
const isOpen = ref(false)

const fontFamily = computed(() => store.fontFamily)
const themeColor = computed(() => store.themeColor)
const fontSizeLevel = computed(() => store.fontSizeLevel)
const fontScale = computed(() => store.fontScale)
const themeMode = computed(() => store.themeMode)
const highContrast = computed(() => store.highContrast)

const fontFamilies: { id: FontFamily; name: string; desc: string }[] = [
  { id: 'google-sans', name: 'Google Sans (Default)', desc: 'Clean, futuristic government font' },
  { id: 'inter', name: 'Inter UI', desc: 'Sleek UI typeface' },
  { id: 'battambang', name: 'Battambang Khmer', desc: 'Classic Khmer font' },
  { id: 'dyslexic', name: 'OpenDyslexic', desc: 'Dyslexia friendly typography' }
]

const themeColors: { hex: ThemeColor; label: string }[] = [
  { hex: '#293375', label: 'MPWT Royal Navy' },
  { hex: '#0f766e', label: 'Emerald Teal' },
  { hex: '#0284c7', label: 'Sky Blue' },
  { hex: '#7c3aed', label: 'Deep Violet' }
]

function setFontFamily(family: FontFamily) {
  store.setFontFamily(family)
}

function setThemeColor(color: ThemeColor) {
  store.setThemeColor(color)
}

function setFontSizeLevel(level: number) {
  store.setFontSizeLevel(level)
}

function setThemeMode(mode: ThemeMode) {
  store.setThemeMode(mode)
}

function switchLanguage(code: string) {
  setLocale(code)
}

function toggleHighContrast() {
  store.toggleHighContrast()
}

function resetSettings() {
  store.resetSettings()
}

onMounted(() => {
  store.initAccessibility()
})
</script>
