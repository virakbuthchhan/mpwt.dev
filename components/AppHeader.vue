<template>
  <header class="w-full bg-white shadow-md sticky top-0 z-40 transition-colors duration-200">
    <!-- Top Government Utility Bar -->
    <div class="bg-gov-navy-dark text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700/50">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <span class="font-khmer text-gov-gold font-medium">ព្រះរាជាណាចក្រកម្ពុជា • ជាតិ សាសនា ព្រះមហាក្សត្រ</span>
          <span class="hidden md:inline text-slate-500">|</span>
          <span class="hidden md:inline text-slate-400 font-mono text-[11px]">mpwt.dev</span>
        </div>

        <div class="flex items-center gap-4 ml-auto">
          <!-- Language Switcher -->
          <div class="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              @click="switchLanguage('km')"
              :class="['px-2 py-0.5 rounded text-[11px] font-semibold transition', locale === 'km' ? 'bg-gov-gold text-gov-navy font-bold' : 'text-slate-300 hover:text-white']"
            >
              🇰🇭 ភាសាខ្មែរ
            </button>
            <button
              @click="switchLanguage('en')"
              :class="['px-2 py-0.5 rounded text-[11px] font-semibold transition', locale === 'en' ? 'bg-gov-gold text-gov-navy font-bold' : 'text-slate-300 hover:text-white']"
            >
              🇬🇧 English
            </button>
          </div>

          <!-- Admin Quick Link -->
          <NuxtLink
            to="/admin"
            class="text-gov-gold hover:text-white flex items-center gap-1 font-medium transition text-[11px]"
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
    <div class="max-w-7xl mx-auto py-3 px-4 sm:px-8 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <!-- Official MPWT Crest / Seal Placeholder -->
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gov-navy flex items-center justify-center text-gov-gold font-bold shadow-md border-2 border-gov-gold group-hover:scale-105 transition transform">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0L9 14m3-3l3 3m-3-3v8" />
          </svg>
        </div>

        <div>
          <h1 class="text-base sm:text-lg font-bold text-gov-navy leading-tight group-hover:text-gov-navy-light transition">
            {{ $t('site.title') }}
          </h1>
          <p class="text-xs text-slate-600 font-medium">
            {{ $t('site.subtitle') }} • {{ $t('site.ministry') }}
          </p>
        </div>
      </NuxtLink>

      <!-- Desktop Search Trigger -->
      <div class="hidden lg:flex items-center gap-2">
        <SearchBar class="w-64" />
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="lg:hidden p-2 text-gov-navy hover:bg-slate-100 rounded-lg focus:outline-none"
        aria-label="Toggle navigation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation Menu Bar -->
    <nav class="bg-gov-navy text-white shadow-inner hidden lg:block border-t border-gov-navy-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <ul class="flex items-center space-x-1 font-medium text-xs sm:text-sm">
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink
              :to="link.path"
              class="px-3.5 py-3 block hover:bg-gov-navy-light hover:text-gov-gold transition border-b-2 border-transparent"
              active-class="bg-gov-navy-light text-gov-gold border-gov-gold font-semibold"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Drawer Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-gov-navy text-white px-4 py-4 space-y-3 border-t border-slate-700">
      <SearchBar class="w-full mb-3" />
      <ul class="space-y-1 font-medium text-sm">
        <li v-for="link in navLinks" :key="link.path">
          <NuxtLink
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded hover:bg-gov-navy-light hover:text-gov-gold transition"
            active-class="bg-gov-navy-light text-gov-gold font-bold"
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
