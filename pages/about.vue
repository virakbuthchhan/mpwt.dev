<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Department Profile</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('about.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('about.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Mission & Vision Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-2xl p-8 shadow-md border border-slate-200 space-y-4 relative overflow-hidden">
        <div class="w-12 h-12 rounded-xl bg-gov-navy text-gov-gold flex items-center justify-center text-2xl font-bold">
          🎯
        </div>
        <h2 class="text-xl font-bold text-gov-navy font-khmer">
          {{ $t('about.mission') }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {{ $t('about.missionText') }}
        </p>
      </div>

      <div class="bg-gov-navy text-white rounded-2xl p-8 shadow-xl border border-gov-navy-dark space-y-4 relative overflow-hidden">
        <div class="w-12 h-12 rounded-xl bg-gov-gold text-gov-navy flex items-center justify-center text-2xl font-bold">
          👁️
        </div>
        <h2 class="text-xl font-bold font-khmer text-gov-gold">
          {{ $t('about.vision') }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {{ $t('about.visionText') }}
        </p>
      </div>
    </div>

    <!-- Department History Timeline -->
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
          {{ $t('about.history') }}
        </h2>
        <div class="w-12 h-1 bg-gov-gold mx-auto mt-1 rounded"></div>
      </div>

      <div class="relative border-l-2 border-gov-gold/50 ml-4 sm:ml-32 space-y-8">
        <div v-for="milestone in historyMilestones" :key="milestone.year" class="relative pl-6 sm:pl-8 group">
          <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gov-gold border-4 border-white shadow"></div>
          <div class="sm:absolute sm:-left-32 sm:top-1 font-mono text-sm font-bold text-gov-navy sm:text-right sm:w-24">
            {{ milestone.year }}
          </div>
          <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-1">
            <h3 class="text-sm font-bold text-slate-900">{{ milestone.title }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">{{ milestone.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Org Chart -->
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
          {{ $t('about.orgChart') }}
        </h2>
        <div class="w-12 h-1 bg-gov-gold mx-auto mt-1 rounded"></div>
      </div>

      <div class="bg-white p-8 rounded-2xl shadow-md border border-slate-200 space-y-6 text-center">
        <!-- Director -->
        <div class="max-w-xs mx-auto bg-gov-navy text-white p-4 rounded-xl shadow border-2 border-gov-gold">
          <div class="font-bold text-sm">Director of DITS</div>
          <div class="text-xs text-gov-gold">នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន</div>
        </div>
        <div class="w-0.5 h-6 bg-slate-300 mx-auto"></div>
        <!-- Deputy -->
        <div class="max-w-xs mx-auto bg-slate-800 text-white p-3 rounded-xl text-xs font-semibold">
          Deputy Director (អនុប្រធាននាយកដ្ឋាន)
        </div>
        <div class="w-0.5 h-6 bg-slate-300 mx-auto"></div>
        <!-- Units Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="bg-slate-100 p-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-800">
            💻 Software Development Unit
          </div>
          <div class="bg-slate-100 p-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-800">
            🌐 Infrastructure & Network Unit
          </div>
          <div class="bg-slate-100 p-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-800">
            📊 Data & GIS Management Unit
          </div>
        </div>
      </div>
    </div>

    <!-- Department Leadership -->
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-xl sm:text-2xl font-bold text-gov-navy font-khmer">
          {{ $t('about.leadership') }}
        </h2>
        <div class="w-12 h-1 bg-gov-gold mx-auto mt-1 rounded"></div>
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
