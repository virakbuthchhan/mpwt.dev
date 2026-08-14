<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage Tech Showcase</h1>
        <p class="text-xs text-slate-500">Update digital platforms, mobile apps, tech stack tags, and status badges</p>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Add Tech Platform</span>
      </button>
    </div>

    <DataTable
      :columns="columns"
      :items="techList"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteTech"
    >
      <template #col-status="{ item }">
        <span
          :class="[
            'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
            item.status === 'Live' ? 'bg-emerald-100 text-emerald-800' : '',
            item.status === 'In Development' ? 'bg-blue-100 text-blue-800' : '',
            item.status === 'Maintenance' ? 'bg-rose-100 text-rose-800' : ''
          ]"
        >
          {{ item.status }}
        </span>
      </template>

      <template #col-techStack="{ item }">
        <div class="flex flex-wrap gap-1 font-mono text-[10px]">
          <span v-for="t in item.techStack" :key="t" class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded">
            {{ t }}
          </span>
        </div>
      </template>
    </DataTable>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-base">{{ editingId ? 'Edit Platform' : 'Add Tech Platform' }}</h3>
          <button @click="showModal = false" class="text-slate-400 font-bold">✕</button>
        </div>

        <form @submit.prevent="saveTech" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">System Name</label>
              <input v-model="form.name" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-bold" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Category</label>
              <select v-model="form.category" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold">
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Data">Data</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Status</label>
              <select v-model="form.status" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold">
                <option value="Live">Live</option>
                <option value="In Development">In Development</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Launch Year</label>
              <input v-model.number="form.launchYear" type="number" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Tech Stack (comma separated)</label>
            <input v-model="techStackInput" type="text" placeholder="Laravel 11, Vue 3, PostgreSQL, Docker" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
          </div>

          <div>
            <label class="font-bold text-slate-700 block">System URL</label>
            <input v-model="form.systemUrl" type="url" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Description (Khmer)</label>
            <textarea v-model="form.descriptionKh" rows="2" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer"></textarea>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Description (English)</label>
            <textarea v-model="form.descriptionEn" rows="2" class="w-full p-2 bg-slate-50 border border-slate-300 rounded"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-slate-100 text-slate-700 rounded font-bold">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-gov-navy text-white rounded font-bold">Save System</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/admin/DataTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { data, refresh } = await useFetch<{ data: any[] }>('/api/technology')
const techList = computed(() => data.value?.data || [])

const showModal = ref(false)
const editingId = ref<string | null>(null)
const techStackInput = ref('')

const form = reactive({
  name: '',
  category: 'Web',
  status: 'Live',
  launchYear: 2025,
  systemUrl: 'https://mpwt.gov.kh',
  descriptionKh: '',
  descriptionEn: '',
  logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
})

const columns = [
  { key: 'name', label: 'System Name' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'techStack', label: 'Tech Stack' },
  { key: 'launchYear', label: 'Launch Year' }
]

function openCreateModal() {
  editingId.value = null
  techStackInput.value = 'Vue 3, Nuxt, Node'
  Object.assign(form, {
    name: '',
    category: 'Web',
    status: 'Live',
    launchYear: 2025,
    systemUrl: 'https://mpwt.gov.kh',
    descriptionKh: '',
    descriptionEn: '',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80'
  })
  showModal.value = true
}

function openEditModal(item: any) {
  editingId.value = item.id
  techStackInput.value = item.techStack.join(', ')
  Object.assign(form, item)
  showModal.value = true
}

async function saveTech() {
  const payload = {
    ...form,
    techStack: techStackInput.value.split(',').map((s) => s.trim())
  }
  if (editingId.value) {
    await $fetch(`/api/technology/${editingId.value}`, { method: 'PUT', body: payload })
  } else {
    await $fetch('/api/technology', { method: 'POST', body: payload })
  }
  showModal.value = false
  refresh()
}

async function deleteTech(item: any) {
  if (confirm(`Delete tech system "${item.name}"?`)) {
    await $fetch(`/api/technology/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
