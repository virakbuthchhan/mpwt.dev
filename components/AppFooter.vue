<template>
  <footer class="bg-gov-navy-dark text-slate-300 border-t-4 border-gov-gold pt-12 pb-6 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
      <!-- Col 1: Department Info -->
      <div class="md:col-span-2 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gov-navy flex items-center justify-center text-gov-gold border border-gov-gold font-bold text-sm shadow">
            DITS
          </div>
          <div>
            <h3 class="text-white font-bold text-base sm:text-lg">
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
        <div class="flex items-center gap-2 text-xs text-slate-400">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Official Government Domain: <strong class="text-gov-gold font-mono">mpwt.dev</strong></span>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div>
        <h4 class="text-white font-bold text-sm mb-3 uppercase tracking-wider text-gov-gold">
          {{ $t('home.quickLinks') }}
        </h4>
        <ul class="space-y-2 text-xs sm:text-sm">
          <li>
            <NuxtLink to="/services" class="hover:text-gov-gold transition">
              • {{ $t('nav.services') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/technology" class="hover:text-gov-gold transition">
              • {{ $t('nav.technology') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projects" class="hover:text-gov-gold transition">
              • {{ $t('nav.projects') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/open-data" class="hover:text-gov-gold transition">
              • {{ $t('nav.openData') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/staff" class="hover:text-gov-gold transition">
              • {{ $t('nav.staff') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Col 3: Contact Details -->
      <div>
        <h4 class="text-white font-bold text-sm mb-3 uppercase tracking-wider text-gov-gold">
          {{ $t('contact.title') }}
        </h4>
        <ul class="space-y-2.5 text-xs text-slate-400">
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 text-gov-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ $t('contact.addressText') }}</span>
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gov-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h32a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 18h18" />
            </svg>
            <span>+855 23 888 100 / dits@mpwt.gov.kh</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="max-w-7xl mx-auto border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
      <p>
        Department of Information Technology Systems | Directorate General of GDPTR | Ministry of Public Works and Transport | <span class="text-gov-gold font-mono">mpwt.dev</span>
      </p>
      <p>© {{ new Date().getFullYear() }} All Rights Reserved.</p>
    </div>
  </footer>
</template>
