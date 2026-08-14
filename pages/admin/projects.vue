<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage IT Projects</h1>
        <p class="text-xs text-slate-500">Track and update ongoing and completed IT development projects</p>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Add Project</span>
      </button>
    </div>

    <DataTable
      :columns="columns"
      :items="projects"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteProject"
    >
      <template #col-status="{ item }">
        <span
          :class="[
            'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
            item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : '',
            item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : '',
            item.status === 'Planning' ? 'bg-amber-100 text-amber-800' : ''
          ]"
        >
          {{ item.status }}
        </span>
      </template>

      <template #col-progress="{ item }">
        <div class="flex items-center gap-2 font-mono text-xs">
          <div class="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-gov-navy" :style="{ width: `${item.progress}%` }"></div>
          </div>
          <span>{{ item.progress }}%</span>
        </div>
      </template>
    </DataTable>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-base">{{ editingId ? 'Edit Project' : 'Add New Project' }}</h3>
          <button @click="showModal = false" class="text-slate-400 font-bold">✕</button>
        </div>

        <form @submit.prevent="saveProject" class="space-y-3">
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
              <label class="font-bold text-slate-700 block">Status</label>
              <select v-model="form.status" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold">
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Progress (%)</label>
              <input v-model.number="form.progress" type="number" min="0" max="100" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Year</label>
              <input v-model.number="form.year" type="number" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Timeline</label>
              <input v-model="form.timeline" type="text" placeholder="2025 - 2026" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Responsible Unit</label>
              <input v-model="form.responsibleUnit" type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
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
            <button type="submit" class="px-5 py-2 bg-gov-navy text-white rounded font-bold">Save Project</button>
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

const { data, refresh } = await useFetch<{ data: any[] }>('/api/projects')
const projects = computed(() => data.value?.data || [])

const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  titleKh: '',
  titleEn: '',
  descriptionKh: '',
  descriptionEn: '',
  status: 'Planning',
  progress: 0,
  timeline: '2026',
  responsibleUnit: 'Software Development Unit',
  unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
  year: 2026
})

const columns = [
  { key: 'titleEn', label: 'Project Title' },
  { key: 'status', label: 'Status' },
  { key: 'progress', label: 'Progress' },
  { key: 'responsibleUnit', label: 'Responsible Unit' },
  { key: 'year', label: 'Year' }
]

function openCreateModal() {
  editingId.value = null
  Object.assign(form, {
    titleKh: '',
    titleEn: '',
    descriptionKh: '',
    descriptionEn: '',
    status: 'Planning',
    progress: 0,
    timeline: '2026',
    responsibleUnit: 'Software Development Unit',
    unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
    year: 2026
  })
  showModal.value = true
}

function openEditModal(item: any) {
  editingId.value = item.id
  Object.assign(form, item)
  showModal.value = true
}

async function saveProject() {
  if (editingId.value) {
    await $fetch(`/api/projects/${editingId.value}`, { method: 'PUT', body: form })
  } else {
    await $fetch('/api/projects', { method: 'POST', body: form })
  }
  showModal.value = false
  refresh()
}

async function deleteProject(item: any) {
  if (confirm(`Delete project "${item.titleEn}"?`)) {
    await $fetch(`/api/projects/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
