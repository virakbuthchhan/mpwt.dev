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
    <div v-if="showModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative border border-slate-100">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gov-navy/10 text-gov-navy flex items-center justify-center font-bold">
              <svg class="w-5 h-5 text-gov-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-base sm:text-lg leading-tight">{{ editingId ? 'Edit FAQ Item' : 'Add FAQ Item' }}</h3>
              <p class="text-xs text-slate-500">Configure bilingual question and answer entries</p>
            </div>
          </div>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">✕</button>
        </div>

        <form @submit.prevent="saveFaq" class="space-y-4">
          <BaseSelect
            v-model="form.category"
            label="Category"
            icon="folder"
            required
            :options="['General', 'Services', 'IT Support', 'Open Data']"
          />

          <BaseInput
            v-model="form.questionKh"
            label="Question (Khmer)"
            placeholder="សំណួរជាភាសាខ្មែរ..."
            fontKhmer
            required
          />

          <BaseInput
            v-model="form.questionEn"
            label="Question (English)"
            placeholder="e.g. How can I request API access?"
            required
          />

          <BaseTextarea
            v-model="form.answerKh"
            label="Answer (Khmer)"
            placeholder="ចម្លើយជាភាសាខ្មែរ..."
            fontKhmer
            required
            rows="3"
          />

          <BaseTextarea
            v-model="form.answerEn"
            label="Answer (English)"
            placeholder="Detailed answer explanation..."
            required
            rows="3"
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
              Save FAQ
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
