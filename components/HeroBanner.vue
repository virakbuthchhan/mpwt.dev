<template>
  <section class="relative bg-gov-navy text-white py-16 sm:py-20 px-4 sm:px-8 overflow-hidden border-b-4 border-gov-gold">
    <!-- Subtle Pattern / Gradient Background -->
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#c9a84c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
    <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gov-gold/10 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Left Content -->
      <div class="lg:col-span-8 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gov-navy-light/80 border border-gov-gold/40 text-gov-gold text-xs font-semibold shadow">
          <span class="w-2 h-2 rounded-full bg-gov-gold animate-ping"></span>
          <span>{{ $t('site.subtitle') }}</span>
        </div>

        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white font-khmer">
          {{ $t('home.heroTitle') }}
        </h1>

        <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          {{ $t('home.heroDesc') }}
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <NuxtLink
            to="/services"
            class="px-6 py-3 bg-gov-gold hover:bg-gov-gold-light text-gov-navy font-bold rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-sm flex items-center gap-2"
          >
            <span>{{ $t('home.exploreServices') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/projects"
            class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition text-sm flex items-center gap-2"
          >
            <span>{{ $t('home.viewProjects') }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Feature Badge Card -->
      <div class="lg:col-span-4 hidden lg:block">
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl space-y-4">
          <div class="flex items-center gap-3 border-b border-white/10 pb-4">
            <div class="w-12 h-12 rounded-xl bg-gov-gold text-gov-navy font-bold flex items-center justify-center text-xl shadow">
              99.9%
            </div>
            <div>
              <div class="text-xs text-slate-300 uppercase tracking-wider font-semibold">Uptime Reliability</div>
              <div class="text-sm font-bold text-white">Government Cloud Infra</div>
            </div>
          </div>

          <div class="space-y-3 text-xs text-slate-200">
            <div class="flex items-center justify-between">
              <span>National Automation Portal</span>
              <span class="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Driver License System</span>
              <span class="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div class="flex items-center justify-between">
              <span>ROAD CARE Mobile Platform</span>
              <span class="text-emerald-400 font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
