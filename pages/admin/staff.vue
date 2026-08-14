<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage Staff Directory</h1>
        <p class="text-xs text-slate-500">Update officer profiles, positions, units, and contact info</p>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Add Staff</span>
      </button>
    </div>

    <DataTable
      :columns="columns"
      :items="staffList"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteStaff"
    />

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-base">{{ editingId ? 'Edit Staff Member' : 'Add Staff Member' }}</h3>
          <button @click="showModal = false" class="text-slate-400 font-bold">✕</button>
        </div>

        <form @submit.prevent="saveStaff" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Name (Khmer)</label>
              <input v-model="form.nameKh" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Name (English)</label>
              <input v-model="form.nameEn" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Position (Khmer)</label>
              <input v-model="form.positionKh" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Position (English)</label>
              <input v-model="form.positionEn" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
            </div>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Unit / Office</label>
            <select v-model="form.unitEn" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold">
              <option value="Department Executive">Department Executive</option>
              <option value="Software Development Unit">Software Development Unit</option>
              <option value="Infrastructure & Network Unit">Infrastructure & Network Unit</option>
              <option value="Data Management & GIS Unit">Data Management & GIS Unit</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-slate-700 block">Email</label>
              <input v-model="form.email" required type="email" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
            <div>
              <label class="font-bold text-slate-700 block">Phone</label>
              <input v-model="form.phone" type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
            </div>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Photo URL</label>
            <input v-model="form.photo" type="url" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono" />
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-slate-100 text-slate-700 rounded font-bold">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-gov-navy text-white rounded font-bold">Save Staff</button>
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

const { data, refresh } = await useFetch<{ data: any[] }>('/api/staff')
const staffList = computed(() => data.value?.data || [])

const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  nameKh: '',
  nameEn: '',
  positionKh: '',
  positionEn: '',
  unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
  unitEn: 'Software Development Unit',
  email: '',
  phone: '+855 23 888 100',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
})

const columns = [
  { key: 'nameEn', label: 'Name (EN)' },
  { key: 'positionEn', label: 'Position' },
  { key: 'unitEn', label: 'Unit' },
  { key: 'email', label: 'Email' }
]

function openCreateModal() {
  editingId.value = null
  Object.assign(form, {
    nameKh: '',
    nameEn: '',
    positionKh: '',
    positionEn: '',
    unitKh: 'ការិយាល័យអភិវឌ្ឍន៍កម្មវិធី',
    unitEn: 'Software Development Unit',
    email: '',
    phone: '+855 23 888 100',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  })
  showModal.value = true
}

function openEditModal(item: any) {
  editingId.value = item.id
  Object.assign(form, item)
  showModal.value = true
}

async function saveStaff() {
  if (editingId.value) {
    await $fetch(`/api/staff/${editingId.value}`, { method: 'PUT', body: form })
  } else {
    await $fetch('/api/staff', { method: 'POST', body: form })
  }
  showModal.value = false
  refresh()
}

async function deleteStaff(item: any) {
  if (confirm(`Delete staff member "${item.nameEn}"?`)) {
    await $fetch(`/api/staff/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
