<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage FAQ Items</h1>
        <p class="text-xs text-slate-500">Create, edit, and categorize frequently asked questions</p>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Add FAQ</span>
      </button>
    </div>

    <DataTable
      :columns="columns"
      :items="faqList"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteFaq"
    />

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-xs sm:text-sm">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-base">{{ editingId ? 'Edit FAQ Item' : 'Add FAQ Item' }}</h3>
          <button @click="showModal = false" class="text-slate-400 font-bold">✕</button>
        </div>

        <form @submit.prevent="saveFaq" class="space-y-3">
          <div>
            <label class="font-bold text-slate-700 block">Category</label>
            <select v-model="form.category" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold">
              <option value="General">General</option>
              <option value="Services">Services</option>
              <option value="Support">IT Support</option>
              <option value="OpenData">Open Data</option>
            </select>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Question (Khmer)</label>
            <input v-model="form.questionKh" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer" />
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Question (English)</label>
            <input v-model="form.questionEn" required type="text" class="w-full p-2 bg-slate-50 border border-slate-300 rounded" />
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Answer (Khmer)</label>
            <textarea v-model="form.answerKh" rows="3" required class="w-full p-2 bg-slate-50 border border-slate-300 rounded font-khmer"></textarea>
          </div>

          <div>
            <label class="font-bold text-slate-700 block">Answer (English)</label>
            <textarea v-model="form.answerEn" rows="3" required class="w-full p-2 bg-slate-50 border border-slate-300 rounded"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-slate-100 text-slate-700 rounded font-bold">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-gov-navy text-white rounded font-bold">Save FAQ</button>
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

const { data, refresh } = await useFetch<{ data: any[] }>('/api/faq')
const faqList = computed(() => data.value?.data || [])

const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({
  category: 'General',
  questionKh: '',
  questionEn: '',
  answerKh: '',
  answerEn: ''
})

const columns = [
  { key: 'category', label: 'Category' },
  { key: 'questionEn', label: 'Question (English)' },
  { key: 'questionKh', label: 'Question (Khmer)' }
]

function openCreateModal() {
  editingId.value = null
  Object.assign(form, {
    category: 'General',
    questionKh: '',
    questionEn: '',
    answerKh: '',
    answerEn: ''
  })
  showModal.value = true
}

function openEditModal(item: any) {
  editingId.value = item.id
  Object.assign(form, item)
  showModal.value = true
}

async function saveFaq() {
  if (editingId.value) {
    await $fetch(`/api/faq/${editingId.value}`, { method: 'PUT', body: form })
  } else {
    await $fetch('/api/faq', { method: 'POST', body: form })
  }
  showModal.value = false
  refresh()
}

async function deleteFaq(item: any) {
  if (confirm(`Delete FAQ "${item.questionEn}"?`)) {
    await $fetch(`/api/faq/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
