<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Site Settings & Inbox</h1>
      <p class="text-xs text-slate-500">Manage announcement ticker banners, contact inquiries, and admin users</p>
    </div>

    <!-- Announcement Ticker Settings -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
      <h2 class="text-base font-bold text-gov-navy border-b border-slate-100 pb-3 flex items-center gap-2">
        <span>📢</span>
        <span>Announcement Ticker Banner</span>
      </h2>

      <div v-if="savedSuccess" class="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold">
        ✅ Settings saved successfully!
      </div>

      <form @submit.prevent="saveSettings" class="space-y-4 text-xs sm:text-sm">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Ticker Message (Khmer)</label>
          <input v-model="settings.announcementTickerKh" type="text" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg font-khmer" />
        </div>

        <div>
          <label class="font-bold text-slate-700 block mb-1">Ticker Message (English)</label>
          <input v-model="settings.announcementTickerEn" type="text" class="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Contact Phone</label>
            <input v-model="settings.contactPhone" type="text" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono" />
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Contact Email</label>
            <input v-model="settings.contactEmail" type="email" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono" />
          </div>
        </div>

        <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg font-bold shadow text-xs">
          {{ saving ? 'Saving...' : 'Save Ticker Settings' }}
        </button>
      </form>
    </div>

    <!-- Contact Inquiry Inbox -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
      <h2 class="text-base font-bold text-gov-navy border-b border-slate-100 pb-3 flex items-center justify-between">
        <span class="flex items-center gap-2">
          <span>📨</span>
          <span>Contact Inquiry Inbox</span>
        </span>
        <span class="text-xs font-mono bg-gov-gold/20 text-gov-navy font-bold px-2 py-0.5 rounded">
          {{ inquiries.length }} Messages
        </span>
      </h2>

      <div v-if="inquiries.length === 0" class="text-xs text-slate-400 py-8 text-center">
        No contact inquiries submitted yet.
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="iq in inquiries"
          :key="iq.id"
          :class="[
            'p-4 rounded-xl border transition space-y-2 text-xs',
            iq.read ? 'bg-slate-50 border-slate-200' : 'bg-amber-50/50 border-amber-300 shadow-sm'
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900 text-sm">{{ iq.name }}</span>
              <span class="text-slate-500 font-mono text-[11px]">&lt;{{ iq.email }}&gt;</span>
              <span v-if="!iq.read" class="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold rounded text-[10px]">NEW</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span>{{ iq.createdAt }}</span>
              <button @click="deleteInquiry(iq.id)" class="text-rose-600 font-bold hover:underline">Delete</button>
            </div>
          </div>

          <div class="font-bold text-gov-navy">{{ iq.subject }}</div>
          <p class="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">{{ iq.message }}</p>
        </div>
      </div>
    </div>

    <!-- Admin Users & Roles Overview -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
      <h2 class="text-base font-bold text-gov-navy border-b border-slate-100 pb-3 flex items-center gap-2">
        <span>🔑</span>
        <span>Admin User Accounts & Role Permissions</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-900">Super Admin</span>
            <span class="px-2 py-0.5 bg-gov-navy text-gov-gold font-bold rounded text-[10px]">FULL ACCESS</span>
          </div>
          <p class="text-slate-600 text-[11px]">Can Create, Edit, Delete all content and manage system settings.</p>
          <div class="font-mono text-slate-500 text-[11px]">Username: admin</div>
        </div>

        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-900">Content Editor</span>
            <span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">EDIT & CREATE</span>
          </div>
          <p class="text-slate-600 text-[11px]">Can Create & Edit news, projects, staff, and datasets.</p>
          <div class="font-mono text-slate-500 text-[11px]">Username: editor</div>
        </div>

        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-900">Audit Viewer</span>
            <span class="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold rounded text-[10px]">READ ONLY</span>
          </div>
          <p class="text-slate-600 text-[11px]">Can view dashboard reports, analytics, and inquiry inbox.</p>
          <div class="font-mono text-slate-500 text-[11px]">Username: viewer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const siteStore = useSiteStore()
const saving = ref(false)
const savedSuccess = ref(false)

const settings = reactive({
  announcementTickerKh: siteStore.announcementTickerKh,
  announcementTickerEn: siteStore.announcementTickerEn,
  contactPhone: '+855 23 888 100',
  contactEmail: 'dits@mpwt.gov.kh'
})

const { data: setRes } = await useFetch<{ data: any }>('/api/settings')
if (setRes.value?.data) {
  Object.assign(settings, setRes.value.data)
}

const { data: iqRes, refresh: refreshInquiries } = await useFetch<{ data: any[] }>('/api/inquiries')
const inquiries = computed(() => iqRes.value?.data || [])

async function saveSettings() {
  saving.value = true
  try {
    await $fetch('/api/settings', { method: 'PUT', body: settings })
    siteStore.announcementTickerKh = settings.announcementTickerKh
    siteStore.announcementTickerEn = settings.announcementTickerEn
    savedSuccess.value = true
    setTimeout(() => (savedSuccess.value = false), 3500)
  } catch (err) {
    console.error('Settings save error', err)
  } finally {
    saving.value = false
  }
}

async function deleteInquiry(id: string) {
  if (confirm('Delete inquiry message?')) {
    await $fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
    refreshInquiries()
  }
}
</script>
