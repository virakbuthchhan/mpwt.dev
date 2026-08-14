<template>
  <div class="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-widest bg-gov-navy/5 px-3 py-1 rounded-full border border-gov-gold/30">
        Public & Ministry Services
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 font-khmer">
        {{ $t('services.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
        {{ $t('services.subtitle') }}
      </p>
      <div class="w-20 h-1 bg-gov-gold mx-auto rounded-full"></div>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
      >
        <div class="space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-gov-navy text-gov-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition">
            <component :is="service.icon" class="w-7 h-7 text-gov-gold" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 group-hover:text-gov-navy transition font-khmer">
            {{ locale === 'km' ? service.titleKh : service.titleEn }}
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed font-sans">
            {{ locale === 'km' ? service.descKh : service.descEn }}
          </p>
        </div>

        <button
          @click="openDetail(service)"
          class="mt-8 pt-4 border-t border-slate-100 text-xs font-bold text-gov-navy group-hover:text-gov-gold transition inline-flex items-center gap-2"
        >
          <span>{{ $t('services.learnMore') }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Service Detail Modal -->
    <div v-if="selectedService" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
        <button
          @click="selectedService = null"
          class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-base font-bold"
        >
          ✕
        </button>

        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gov-navy text-gov-gold flex items-center justify-center shadow-lg shrink-0">
            <component :is="selectedService.icon" class="w-7 h-7 text-gov-gold" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 leading-snug">
              {{ locale === 'km' ? selectedService.titleKh : selectedService.titleEn }}
            </h3>
            <span class="text-xs text-gov-gold font-bold uppercase tracking-wider">Category: {{ selectedService.category }}</span>
          </div>
        </div>

        <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 font-sans">
          <p>{{ locale === 'km' ? selectedService.detailKh : selectedService.detailEn }}</p>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <strong class="text-slate-900">Target Users:</strong> {{ selectedService.users }}
          </div>
        </div>

        <button
          @click="selectedService = null"
          class="w-full py-3 bg-gov-navy text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition shadow-lg"
        >
          Close Detail View
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

useSeoMeta({
  title: 'សេវាកម្ម IT | Department of IT Systems - MPWT',
  description: 'Catalog of IT services and digital solutions provided by DITS MPWT.'
})

const { locale } = useI18n()
const selectedService = ref<any>(null)

function openDetail(s: any) {
  selectedService.value = s
}

function createSvgIcon(d: string) {
  return () =>
    h('svg', { class: 'w-7 h-7 text-gov-gold', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d })
    ])
}

const services = [
  {
    id: 1,
    icon: createSvgIcon('M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6'),
    category: 'Public E-Services',
    titleKh: 'ប្រព័ន្ធស្វ័យប្រវត្តិកម្មបណ្ណបើកបរ',
    titleEn: 'Driver License Online Automation',
    descKh: 'សេវាស្នើសុំ និងបន្តបណ្ណបើកបរយានយន្តតាមអនឡាញប្រកបដោយភាពរហ័ស។',
    descEn: 'Online driver license application and renewal automation system.',
    detailKh: 'ប្រព័ន្ធនេះអនុញ្ញាតឱ្យប្រជាពលរដ្ឋបំពេញព័ត៌មាន កក់ការពិនិត្យសុខភាព និងទូទាត់ប្រាក់តាមសេវាធនាគារចល័ត។',
    detailEn: 'Citizens can apply, schedule health checks, and execute digital payments seamlessly.',
    users: 'General Public'
  },
  {
    id: 2,
    icon: createSvgIcon('M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1'),
    category: 'Inspection & Registration',
    titleKh: 'ប្រព័ន្ធត្រួតពិនិត្យលក្ខណៈបច្ចេកទេសយានយន្ត',
    titleEn: 'Automated Vehicle Inspection System',
    descKh: 'ការគ្រប់គ្រងទិន្នន័យឆៀកយានយន្ត និងចេញលិខិតបញ្ជាក់លក្ខណៈបច្ចេកទេស។',
    descEn: 'Managing vehicle technical inspection logs and certification automated.',
    detailKh: 'ប្រព័ន្ធចម្លងទិន្នន័យពីម៉ាស៊ីនឆៀកស្វ័យប្រវត្តិចូលទៅកាន់ Data Center របស់ក្រសួងដោយផ្ទាល់។',
    detailEn: 'Transfers live inspection telemetry directly to the MPWT secure data center.',
    users: 'Vehicle Owners & Inspection Centers'
  },
  {
    id: 3,
    icon: createSvgIcon('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'),
    category: 'Mobile Innovation',
    titleKh: 'កម្មវិធីទូរស័ព្ទ ROAD CARE',
    titleEn: 'ROAD CARE Citizen Incident Reporting',
    descKh: 'កម្មវិធីទូរស័ព្ទសម្រាប់ប្រជាពលរដ្ឋរាយការណ៍អំពីផ្លូវខូចជម្រៅ។',
    descEn: 'Citizen mobile application to report potholes and damaged road infrastructure.',
    detailKh: 'ជួយសម្រួលដល់ការថតរូប កត់ត្រាកូអរដោនេ GPS និងផ្ញើសារជូនដំណឹងទៅក្រុមការងារជួសជុល។',
    detailEn: 'Supports GPS location tagging, photo attachments, and automated dispatch to road repair teams.',
    users: 'Citizens & Road Maintenance Units'
  },
  {
    id: 4,
    icon: createSvgIcon('M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'),
    category: 'Geospatial GIS',
    titleKh: 'ប្រព័ន្ធទិន្នន័យភូមិសាស្ត្រផ្លូវថ្នល់ (RAMS-GIS)',
    titleEn: 'Geospatial Road Asset Management (RAMS)',
    descKh: 'ការគ្រប់គ្រងផែនទី និងសារពើភ័ណ្ឌផ្លូវថ្នល់ ស្ពាន និងលូ។',
    descEn: 'GIS spatial mapping and asset management of national roads and bridges.',
    detailKh: 'ផ្តល់ទិន្នន័យលម្អិតអំពីប្រវែងផ្លូវ ប្រភេទកម្រាល និងស្ថានភាពបច្ចេកទេសផ្លូវទូទាំងប្រទេស។',
    detailEn: 'Provides comprehensive GIS layers of road lengths, surface types, and structural health.',
    users: 'Engineers & Transport Planners'
  },
  {
    id: 5,
    icon: createSvgIcon('M3 15a4 4 0 004 4h9a5 5 0 001.09-9.88A5.5 5.5 0 005.04 7.03 4.002 4.002 0 003 15z'),
    category: 'Cloud & Hosting',
    titleKh: 'សេវា Hosting និង Cloud សម្រាប់អង្គភាពក្រសួង',
    titleEn: 'Ministry Private Cloud & Web Hosting',
    descKh: 'ផ្តល់ហេដ្ឋារចនាសម្ព័ន្ធ Hosting សុវត្ថិភាពខ្ពស់ដល់គ្រប់អគ្គនាយកដ្ឋាន។',
    descEn: 'Providing secure government private cloud hosting to all MPWT directorates.',
    detailKh: 'គ្រប់គ្រងម៉ាស៊ីនមេ Proxmox, Kubernetes, និងប្រព័ន្ធ Cybersecurity បង្ការការវាយប្រហារ cyber attacks។',
    detailEn: 'High-availability Kubernetes and virtual machine hosting with firewall defense.',
    users: 'MPWT Internal Directorates'
  },
  {
    id: 6,
    icon: createSvgIcon('M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'),
    category: 'Open Data & API',
    titleKh: 'ច្រកទិន្នន័យបើកទូលាយ និង API តភ្ជាប់',
    titleEn: 'Open Data Portal & Transport REST APIs',
    descKh: 'ការចែករំលែកទិន្នន័យសាធារណៈដល់អ្នកស្រាវជ្រាវ និងដៃគូអភិវឌ្ឍន៍។',
    descEn: 'Public dataset API integrations for researchers and development partners.',
    detailKh: 'ផ្តល់ទិន្នន័យជាទម្រង់ JSON, CSV និង PDF សម្រាប់ប្រើប្រាស់ក្នុងការវិភាគវិស័យដឹកជញ្ជូន។',
    detailEn: 'Public REST API data endpoints adhering to international transport standards.',
    users: 'Developers, Researchers, Public'
  }
]
</script>
