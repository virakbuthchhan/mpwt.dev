<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manage News & Announcements</h1>
        <p class="text-xs text-slate-500">Create, edit, and manage public articles</p>
      </div>

      <NuxtLink
        to="/admin/news/new"
        class="px-4 py-2 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
      >
        <span>➕</span>
        <span>Create Article</span>
      </NuxtLink>
    </div>

    <DataTable
      :columns="columns"
      :items="newsList"
      @create="navigateTo('/admin/news/new')"
      @edit="editArticle"
      @delete="deleteArticle"
    >
      <template #col-titleKh="{ item }">
        <span class="font-bold font-khmer text-slate-900">{{ item.titleKh }}</span>
      </template>

      <template #col-category="{ item }">
        <span class="px-2 py-0.5 bg-gov-navy text-gov-gold rounded text-[10px] font-bold">
          {{ item.category }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/admin/DataTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { data, refresh } = await useFetch<{ data: any[] }>('/api/news')
const newsList = computed(() => data.value?.data || [])

const columns = [
  { key: 'titleKh', label: 'Title (Khmer)' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'publishedAt', label: 'Published Date' },
  { key: 'views', label: 'Views' }
]

function editArticle(item: any) {
  navigateTo(`/admin/news/${item.id}`)
}

async function deleteArticle(item: any) {
  if (confirm(`Are you sure you want to delete "${item.titleEn || item.titleKh}"?`)) {
    await $fetch(`/api/news/${item.id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>
