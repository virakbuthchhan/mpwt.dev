<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-20">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        Department Overview
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('about.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('about.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Mission & Vision Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-5 relative overflow-hidden hover:shadow-xl transition">
        <div class="w-14 h-14 rounded-2xl bg-gov-navy text-gov-gold flex items-center justify-center shadow-lg">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 font-khmer">
          {{ $t('about.mission') }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          {{ $t('about.missionText') }}
        </p>
      </div>

      <div class="bg-gov-navy text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-5 relative overflow-hidden">
        <div class="w-14 h-14 rounded-2xl bg-gov-gold text-gov-navy flex items-center justify-center shadow-lg font-bold">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold font-khmer text-gov-gold">
          {{ $t('about.vision') }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          {{ $t('about.visionText') }}
        </p>
      </div>
    </div>

    <!-- History Timeline -->
    <div class="space-y-10">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-khmer">
          {{ $t('about.history') }}
        </h2>
        <div class="w-16 h-1 bg-gov-gold mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="relative border-l-2 border-gov-gold/50 ml-4 sm:ml-32 space-y-8">
        <div v-for="milestone in historyMilestones" :key="milestone.year" class="relative pl-8 group">
          <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gov-gold border-4 border-white shadow"></div>
          <div class="sm:absolute sm:-left-32 sm:top-1 font-mono text-sm font-bold text-gov-navy sm:text-right sm:w-24">
            {{ milestone.year }}
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-1.5 hover:shadow-md transition">
            <h3 class="text-sm font-bold text-slate-900">{{ milestone.title }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed font-sans">{{ milestone.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Org Structure -->
    <div class="space-y-10">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-khmer">
          {{ $t('about.orgChart') }}
        </h2>
        <div class="w-16 h-1 bg-gov-gold mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-center">
        <div class="max-w-xs mx-auto bg-gov-navy text-white p-5 rounded-2xl shadow-xl border-2 border-gov-gold">
          <div class="font-bold text-sm">Director of DITS</div>
          <div class="text-xs text-gov-gold font-khmer mt-0.5">ប្រធាននាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន</div>
        </div>

        <div class="w-0.5 h-8 bg-slate-300 mx-auto"></div>

        <div class="max-w-xs mx-auto bg-slate-900 text-white p-3.5 rounded-xl text-xs font-bold shadow">
          Deputy Director (អនុប្រធាននាយកដ្ឋាន)
        </div>

        <div class="w-0.5 h-8 bg-slate-300 mx-auto"></div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-sm">
            <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span>Software Development Unit</span>
          </div>

          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-sm">
            <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Infrastructure & Network Unit</span>
          </div>

          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-sm">
            <svg class="w-4 h-4 text-gov-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <span>Data & GIS Management Unit</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Leadership Section -->
    <div class="space-y-10">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-khmer">
          {{ $t('about.leadership') }}
        </h2>
        <div class="w-16 h-1 bg-gov-gold mx-auto mt-2 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StaffCard v-for="leader in leaders" :key="leader.id" :staff="leader" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StaffCard from '~/components/StaffCard.vue'

useSeoMeta({
  title: 'អំពីនាយកដ្ឋាន | Department of IT Systems - MPWT',
  description: 'Mission, vision, history, and organizational structure of the Department of Information Technology Systems.'
})

const { data: staffData } = await useFetch<{ data: any[] }>('/api/staff')
const leaders = computed(() => staffData.value?.data.slice(0, 3) || [])

const historyMilestones = [
  { year: '2020', title: 'Establishment under GDPTR', desc: 'Formally integrated under the Directorate General of GDPTR to drive ministry e-governance.' },
  { year: '2022', title: 'Private Cloud Launch', desc: 'Deployed state-owned private cloud architecture hosting critical transport platforms.' },
  { year: '2024', title: 'Driver License Automation', desc: 'Digitized vehicle licensing and inspection data centers.' },
  { year: '2026', title: 'Open Data & ITS Rollout', desc: 'Expanded open transport data APIs and Expressway traffic monitoring.' }
]
</script>
