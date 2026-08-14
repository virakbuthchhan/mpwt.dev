<template>
  <section class="relative bg-gov-navy text-white py-20 sm:py-24 px-4 sm:px-8 overflow-hidden border-b-4 border-gov-gold">
    <!-- Grid & Radial Glow Overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
    <div class="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
    <div class="absolute -left-24 -bottom-24 w-[500px] h-[500px] rounded-full bg-gov-gold/10 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Left Content -->
      <div class="lg:col-span-8 space-y-6">
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-gov-gold text-xs font-bold shadow-lg">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{{ $t('site.subtitle') }}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white font-khmer">
          {{ $t('home.heroTitle') }}
        </h1>

        <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
          {{ $t('home.heroDesc') }}
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-4">
          <NuxtLink
            to="/services"
            class="px-7 py-3.5 bg-gov-gold hover:bg-gov-gold-light text-gov-navy font-bold rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <span>{{ $t('home.exploreServices') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/projects"
            class="px-7 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-500 transition text-xs sm:text-sm flex items-center gap-2 shadow"
          >
            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{{ $t('home.viewProjects') }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Glassmorphism Uptime & Status Card -->
      <div class="lg:col-span-4 hidden lg:block">
        <div class="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-5">
          <div class="flex items-center gap-3.5 border-b border-slate-800 pb-4">
            <div class="w-12 h-12 rounded-2xl bg-gov-gold text-gov-navy font-bold flex items-center justify-center text-xl shadow-lg font-mono">
              99.9%
            </div>
            <div>
              <div class="text-[11px] text-slate-400 uppercase tracking-widest font-bold">SLAs Uptime</div>
              <div class="text-sm font-bold text-white">Government Cloud Infra</div>
            </div>
          </div>

          <div class="space-y-3 text-xs text-slate-300">
            <div class="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span class="font-medium">National Automation Portal</span>
              <span class="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                ONLINE
              </span>
            </div>
            <div class="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span class="font-medium">Driver Licensing System</span>
              <span class="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                ONLINE
              </span>
            </div>
            <div class="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span class="font-medium">ROAD CARE Mobile API</span>
              <span class="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
