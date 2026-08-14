<template>
  <div class="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-3xl mx-auto">
      <span class="text-xs font-bold text-gov-gold uppercase tracking-wider">Public & Internal Solutions</span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-gov-navy font-khmer">
        {{ $t('services.title') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-600">
        {{ $t('services.subtitle') }}
      </p>
      <div class="w-16 h-1 bg-gov-gold mx-auto rounded"></div>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition group"
      >
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-xl bg-gov-navy text-gov-gold flex items-center justify-center text-2xl shadow group-hover:scale-110 transition">
            {{ service.icon }}
          </div>
          <h3 class="text-base font-bold text-slate-900 group-hover:text-gov-navy transition">
            {{ locale === 'km' ? service.titleKh : service.titleEn }}
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            {{ locale === 'km' ? service.descKh : service.descEn }}
          </p>
        </div>

        <button
          @click="openDetail(service)"
          class="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-gov-navy group-hover:text-gov-gold transition inline-flex items-center gap-1.5"
        >
          <span>{{ $t('services.learnMore') }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Service Detail Modal -->
    <div v-if="selectedService" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <button
          @click="selectedService = null"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold"
        >
          ✕
        </button>

        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gov-navy text-gov-gold flex items-center justify-center text-2xl">
            {{ selectedService.icon }}
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900">
              {{ locale === 'km' ? selectedService.titleKh : selectedService.titleEn }}
            </h3>
            <span class="text-xs text-gov-gold font-bold">Category: {{ selectedService.category }}</span>
          </div>
        </div>

        <div class="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
          <p>{{ locale === 'km' ? selectedService.detailKh : selectedService.detailEn }}</p>
          <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Target Users:</strong> {{ selectedService.users }}
          </div>
        </div>

        <button
          @click="selectedService = null"
          class="w-full py-2.5 bg-gov-navy text-white hover:bg-gov-navy-light rounded-lg text-xs font-bold transition"
        >
          Close View
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

useSeoMeta({
  title: 'សេវាកម្ម IT | Department of IT Systems - MPWT',
  description: 'Catalog of IT services and digital solutions provided by DITS MPWT.'
})

const selectedService = ref<any>(null)

function openDetail(s: any) {
  selectedService.value = s
}

const services = [
  {
    id: 1,
    icon: '🪪',
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
    icon: '🚗',
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
    icon: '📱',
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
    icon: '🗺️',
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
    icon: '☁️',
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
    icon: '📊',
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
