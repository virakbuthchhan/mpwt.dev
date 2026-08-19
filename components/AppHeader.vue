<template>
  <header class="w-full bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200/80 transition-colors duration-200">
    <!-- Top Government Utility Bar -->
    <div class="bg-gov-navy text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-gov-navy-dark">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <span class="font-khmer text-gov-gold font-medium tracking-wide">ព្រះរាជាណាចក្រកម្ពុជា • ជាតិ សាសនា ព្រះមហាក្សត្រ</span>
          <span class="hidden md:inline text-blue-300/40">|</span>
          <span class="hidden md:inline text-slate-200 font-mono text-[11px] bg-gov-navy-dark px-2 py-0.5 rounded border border-gov-navy-light/40">mpwt.dev</span>
        </div>

        <div class="flex items-center gap-4 ml-auto">
          <!-- Language Switcher -->
          <div class="flex items-center bg-gov-navy-dark rounded-lg p-0.5 border border-gov-navy-light/50 shadow-inner">
            <button
              @click="switchLanguage('km')"
              :class="['px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1.5', locale === 'km' ? 'bg-gov-gold text-gov-navy font-bold shadow' : 'text-slate-300 hover:text-white']"
            >
              <span>🇰🇭</span>
              <span>ភាសាខ្មែរ</span>
            </button>
            <button
              @click="switchLanguage('en')"
              :class="['px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1.5', locale === 'en' ? 'bg-gov-gold text-gov-navy font-bold shadow' : 'text-slate-300 hover:text-white']"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          <!-- Admin Portal Trigger -->
          <NuxtLink
            to="/admin"
            class="text-gov-gold hover:text-white flex items-center gap-1.5 font-bold transition text-[11px] px-2.5 py-1 bg-gov-gold/15 rounded-lg border border-gov-gold/40 hover:border-gov-gold shadow-sm"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{{ $t('nav.admin') }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Branding Header -->
    <div class="max-w-7xl mx-auto py-3.5 px-4 sm:px-8 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3.5 group">
        <!-- Official Logo Emblem -->
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center p-1 shadow-md border-2 border-gov-gold/80 group-hover:scale-105 transition transform overflow-hidden">
          <img src="/logo.png" alt="MPWT Logo" class="w-full h-full object-contain" />
        </div>

        <div>
          <h1 class="text-base sm:text-lg font-bold text-gov-navy leading-tight group-hover:text-gov-navy-light transition font-sans">
            {{ $t('site.title') }}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            {{ $t('site.subtitle') }} • <span class="text-gov-gold font-semibold">{{ $t('site.ministry') }}</span>
          </p>
        </div>
      </NuxtLink>

      <!-- Desktop Search Bar -->
      <div class="hidden lg:flex items-center gap-2">
        <SearchBar class="w-72" />
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="lg:hidden p-2 text-gov-navy hover:bg-slate-100 rounded-xl focus:outline-none border border-slate-200"
        aria-label="Toggle navigation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation Bar -->
    <nav class="bg-gov-navy text-white shadow-md hidden lg:block border-t border-gov-navy-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <ul class="flex items-center space-x-1 font-medium text-xs sm:text-sm">
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink
              :to="link.path"
              class="px-4 py-3 block hover:bg-gov-navy-dark hover:text-gov-gold transition border-b-2 border-transparent"
              active-class="bg-gov-navy-dark text-gov-gold border-gov-gold font-bold"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Navigation Drawer -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-gov-navy text-white px-4 py-5 space-y-4 border-t border-gov-navy-dark">
      <SearchBar class="w-full" />
      <ul class="space-y-1 font-medium text-sm">
        <li v-for="link in navLinks" :key="link.path">
          <NuxtLink
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="block px-3.5 py-2.5 rounded-xl hover:bg-gov-navy-dark hover:text-gov-gold transition"
            active-class="bg-gov-navy-dark text-gov-gold font-bold"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)

const navLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/services', label: 'nav.services' },
  { path: '/technology', label: 'nav.technology' },
  { path: '/projects', label: 'nav.projects' },
  { path: '/staff', label: 'nav.staff' },
  { path: '/faq', label: 'nav.faq' },
  { path: '/open-data', label: 'nav.openData' },
  { path: '/news', label: 'nav.news' },
  { path: '/contact', label: 'nav.contact' }
]

function switchLanguage(code: string) {
  setLocale(code)
}
</script>
