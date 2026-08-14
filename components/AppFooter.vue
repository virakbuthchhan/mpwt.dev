<template>
  <footer class="bg-slate-950 text-slate-300 border-t-4 border-gov-gold pt-16 pb-8 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
      <!-- Col 1: Department Info -->
      <div class="md:col-span-2 space-y-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-gov-navy flex items-center justify-center text-gov-gold border-2 border-gov-gold font-bold text-sm shadow-lg">
            <svg class="w-6 h-6 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="text-white font-bold text-base sm:text-lg tracking-tight">
              {{ $t('site.title') }}
            </h3>
            <p class="text-gov-gold text-xs font-semibold">
              {{ $t('site.subtitle') }} • {{ $t('site.ministry') }}
            </p>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
          {{ $t('site.tagline') }}
        </p>

        <div class="flex items-center gap-2.5 text-xs text-slate-400">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Official Domain: <strong class="text-gov-gold font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">mpwt.dev</strong></span>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div class="space-y-3">
        <h4 class="text-white font-bold text-xs uppercase tracking-widest text-gov-gold">
          {{ $t('home.quickLinks') }}
        </h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
          <li>
            <NuxtLink to="/services" class="hover:text-gov-gold transition flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>{{ $t('nav.services') }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/technology" class="hover:text-gov-gold transition flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>{{ $t('nav.technology') }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects" class="hover:text-gov-gold transition flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>{{ $t('nav.projects') }}</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/open-data" class="hover:text-gov-gold transition flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-gov-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>{{ $t('nav.openData') }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Col 3: Contact Info -->
      <div class="space-y-3">
        <h4 class="text-white font-bold text-xs uppercase tracking-widest text-gov-gold">
          {{ $t('contact.title') }}
        </h4>
        <ul class="space-y-3 text-xs text-slate-400">
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-gov-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="leading-relaxed">{{ $t('contact.addressText') }}</span>
          </li>
          <li class="flex items-center gap-2.5">
            <svg class="w-4 h-4 text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 18h18" />
            </svg>
            <span>+855 23 888 100</span>
          </li>
          <li class="flex items-center gap-2.5">
            <svg class="w-4 h-4 text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>dits@mpwt.gov.kh</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
      <p>
        Department of Information Technology Systems | Directorate General of GDPTR | Ministry of Public Works and Transport | <span class="text-gov-gold font-mono">mpwt.dev</span>
      </p>
      <p>© {{ new Date().getFullYear() }} MPWT. All Rights Reserved.</p>
    </div>
  </footer>
</template>
