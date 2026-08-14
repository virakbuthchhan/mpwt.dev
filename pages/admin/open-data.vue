<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage Open Datasets</h1>
        <p class="text-xs text-slate-500">Publish public statistics, CSV/JSON datasets, and technical reports</p>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Add Dataset</span>
      </button>
    </div>

    <DataTable
      :columns="columns"
      :items="datasetList"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteDataset"
    />

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-base">{{ editingId ? 'Edit Dataset' : 'Add New Dataset' }}</h3>
          <button @click="showModal = false" class="text-slate-400 font-bold">✕</button>
        </div>

        <form @submit.prevent="saveDataset" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Title (Khmer)</label>
              <input v-model="form.titleKh" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Title (English)</label>
              <input v-model="form.titleEn" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Format</label>
              <select v-model="form.format" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-bold font-mono">
                <option value="CSV">CSV</option>
                <option value="JSON">JSON</option>
                <option value="PDF">PDF</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Category</label>
              <input v-model="form.category" type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">File Size</label>
              <input v-model="form.fileSize" type="text" placeholder="2.5 MB" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
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
            <button type="submit" class="px-5 py-2 bg-gov-navy text-white rounded font-bold">Save Dataset</button>
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

const { data, refresh } = await useFetch<{ data: any[] }>('/api/open-data')
const datasetList = computed(() => data.value?.data || [])

const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  titleKh: '',
  titleEn: '',
  descriptionKh: '',
  descriptionEn: '',
  category: 'Transport Statistics',
  format: 'CSV',
  fileSize: '2.5 MB',
  lastUpdated: new Date().toISOString().split('T')[0],
  downloadUrl: '/data/sample.csv'
})

const columns = [
  { key: 'titleEn', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'format', label: 'Format' },
  { key: 'fileSize', label: 'File Size' },
  { key: 'downloads', label: 'Downloads' }
]

function openCreateModal() {
  editingId.value = null
  Object.assign(form, {
    titleKh: '',
    titleEn: '',
    descriptionKh: '',
    descriptionEn: '',
    category: 'Transport Statistics',
    format: 'CSV',
    fileSize: '2.5 MB',
    lastUpdated: new Date().toISOString().split('T')[0],
    downloadUrl: '/data/sample.csv'
  })
  showModal.value = true
}

function openEditModal(item: any) {
  editingId.value = item.id
  Object.assign(form, item)
  showModal.value = true
}

async function saveDataset() {
  if (editingId.value) {
    await $fetch(`/api/open-data/${editingId.value}`, { method: 'PUT', body: form })
  } else {
    await $fetch('/api/open-data', { method: 'POST', body: form })
  }
  showModal.value = false
  refresh()
}

async function deleteDataset(item: any) {
  if (confirm(`Delete dataset "${item.titleEn}"?`)) {
    await $fetch(`/api/open-data/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
