<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <div class="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900">
          {{ isNew ? 'Create New Article' : 'Edit Article' }}
        </h1>
        <p class="text-xs text-slate-500">Fill in bilingual title, content, category, and image URL</p>
      </div>

      <NuxtLink to="/admin/news" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition">
        ← Back to List
      </NuxtLink>
    </div>

    <form @submit.prevent="saveArticle" class="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-xs sm:text-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">Title (Khmer) *</label>
          <input v-model="form.titleKh" required type="text" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-khmer focus:ring-2 focus:ring-gov-gold" />
        </div>
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">Title (English) *</label>
          <input v-model="form.titleEn" required type="text" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-gov-gold" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">Category</label>
          <select v-model="form.category" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold">
            <option value="Digital Innovation">Digital Innovation</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Open Data">Open Data</option>
            <option value="General">General Notice</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">Author</label>
          <input v-model="form.author" type="text" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg" />
        </div>
        <div class="space-y-1">
          <label class="font-bold text-slate-700 block">Published Date</label>
          <input v-model="form.publishedAt" type="date" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono" />
        </div>
      </div>

      <div class="space-y-1">
        <label class="font-bold text-slate-700 block">Featured Image URL</label>
        <input v-model="form.imageUrl" type="url" placeholder="https://..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono" />
      </div>

      <div class="space-y-1">
        <label class="font-bold text-slate-700 block">Excerpt (Khmer)</label>
        <textarea v-model="form.excerptKh" rows="2" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-khmer"></textarea>
      </div>

      <div class="space-y-1">
        <label class="font-bold text-slate-700 block">Content Body (Khmer Rich Text)</label>
        <RichEditor v-model="form.contentKh" />
      </div>

      <div class="space-y-1">
        <label class="font-bold text-slate-700 block">Content Body (English Rich Text)</label>
        <RichEditor v-model="form.contentEn" />
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <NuxtLink to="/admin/news" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold">
          Cancel
        </NuxtLink>
        <button type="submit" :disabled="saving" class="px-6 py-2.5 bg-gov-navy hover:bg-gov-navy-light text-white rounded-lg font-bold shadow">
          {{ saving ? 'Saving...' : 'Save Article' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import RichEditor from '~/components/admin/RichEditor.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const route = useRoute()
const articleId = route.params.id as string
const isNew = computed(() => articleId === 'new')

const saving = ref(false)

const form = reactive({
  titleKh: '',
  titleEn: '',
  category: 'Digital Innovation',
  author: 'DITS Admin',
  publishedAt: new Date().toISOString().split('T')[0],
  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  excerptKh: '',
  excerptEn: '',
  contentKh: '<p>បញ្ចូលខ្លឹមសារព័ត៌មានភាសាខ្មែរ...</p>',
  contentEn: '<p>Enter article content in English...</p>'
})

if (!isNew.value) {
  const { data } = await useFetch<{ data: any }>(`/api/news/${articleId}`)
  if (data.value?.data) {
    Object.assign(form, data.value.data)
  }
}

async function saveArticle() {
  saving.value = true
  try {
    if (isNew.value) {
      await $fetch('/api/news', { method: 'POST', body: form })
    } else {
      await $fetch(`/api/news/${articleId}`, { method: 'PUT', body: form })
    }
    navigateTo('/admin/news')
  } catch (err) {
    console.error('Save error', err)
  } finally {
    saving.value = false
  }
}
</script>
