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
    <div v-if="showModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative border border-slate-100">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gov-navy/10 text-gov-navy flex items-center justify-center font-bold">
              <svg class="w-5 h-5 text-gov-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-base sm:text-lg leading-tight">{{ editingId ? 'Edit Project' : 'Add New Project' }}</h3>
              <p class="text-xs text-slate-500">Configure IT project milestones, progress, and unit responsibilities</p>
            </div>
          </div>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">✕</button>
        </div>

        <form @submit.prevent="saveProject" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.titleKh"
              label="Title (Khmer)"
              placeholder="ចំណងជើងគម្រោង"
              fontKhmer
              required
              icon="tag"
            />
            <BaseInput
              v-model="form.titleEn"
              label="Title (English)"
              placeholder="e.g. National Logistics System"
              required
              icon="tag"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <BaseSelect
              v-model="form.status"
              label="Status"
              icon="status"
              required
              :options="['Planning', 'In Progress', 'Completed']"
            />
            <BaseInput
              v-model.number="form.progress"
              type="number"
              min="0"
              max="100"
              label="Progress (%)"
              icon="percent"
              fontMono
            />
            <BaseInput
              v-model.number="form.year"
              type="number"
              label="Year"
              icon="calendar"
              fontMono
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.timeline"
              label="Timeline"
              placeholder="2025 - 2026"
              icon="calendar"
              fontMono
            />
            <BaseInput
              v-model="form.responsibleUnit"
              label="Responsible Unit"
              placeholder="Software Development Unit"
              icon="building"
            />
          </div>

          <BaseTextarea
            v-model="form.descriptionKh"
            label="Description (Khmer)"
            placeholder="ការពិពណ៌នាអំពីគម្រោង..."
            fontKhmer
            rows="2"
          />

          <BaseTextarea
            v-model="form.descriptionEn"
            label="Description (English)"
            placeholder="Project summary and core objectives..."
            rows="2"
          />

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <BaseButton type="button" variant="secondary" @click="showModal = false">
              Cancel
            </BaseButton>
            <BaseButton type="submit" variant="primary">
              <template #icon-left>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </template>
              Save Project
            </BaseButton>
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
