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
    <div v-if="showModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative border border-slate-100">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gov-navy/10 text-gov-navy flex items-center justify-center font-bold">
              <svg class="w-5 h-5 text-gov-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-base sm:text-lg leading-tight">{{ editingId ? 'Edit Staff Member' : 'Add Staff Member' }}</h3>
              <p class="text-xs text-slate-500">Enter officer credentials and unit assignment details</p>
            </div>
          </div>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">✕</button>
        </div>

        <form @submit.prevent="saveStaff" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.nameKh"
              label="Name (Khmer)"
              placeholder="ឈ្មោះភាសាខ្មែរ"
              fontKhmer
              required
              icon="user"
            />
            <BaseInput
              v-model="form.nameEn"
              label="Name (English)"
              placeholder="e.g. Sok Chan"
              required
              icon="user"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.positionKh"
              label="Position (Khmer)"
              placeholder="តួនាទីភាសាខ្មែរ"
              fontKhmer
              required
              icon="tag"
            />
            <BaseInput
              v-model="form.positionEn"
              label="Position (English)"
              placeholder="e.g. Senior Software Engineer"
              required
              icon="tag"
            />
          </div>

          <BaseSelect
            v-model="form.unitEn"
            label="Unit / Office"
            icon="building"
            required
            :options="[
              'Department Executive',
              'Software Development Unit',
              'Infrastructure & Network Unit',
              'Data Management & GIS Unit'
            ]"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.email"
              type="email"
              label="Email Address"
              placeholder="officer@mpwt.gov.kh"
              required
              icon="mail"
              fontMono
            />
            <BaseInput
              v-model="form.phone"
              type="tel"
              label="Phone Number"
              placeholder="+855 23 888 100"
              icon="phone"
              fontMono
            />
          </div>

          <BaseInput
            v-model="form.photo"
            type="url"
            label="Photo URL"
            placeholder="https://images.unsplash.com/..."
            icon="photo"
            fontMono
            clearable
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
              Save Staff
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
