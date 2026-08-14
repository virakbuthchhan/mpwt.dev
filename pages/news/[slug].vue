<template>
  <div class="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
    <NuxtLink to="/news" class="inline-flex items-center gap-2 text-xs font-bold text-gov-navy hover:text-gov-gold transition bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back to All News</span>
    </NuxtLink>

    <div v-if="pending" class="h-96 bg-slate-200 animate-pulse rounded-3xl"></div>

    <article v-else-if="article" class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-8">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="px-3.5 py-1 bg-gov-navy text-gov-gold rounded-full text-xs font-bold uppercase tracking-wider border border-gov-gold/40">
            {{ article.category }}
          </span>
          <span class="text-xs font-mono text-slate-400">• {{ article.publishedAt }}</span>
          <span class="text-xs font-mono text-slate-400">• {{ article.views }} views</span>
        </div>

        <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-khmer">
          {{ locale === 'km' ? article.titleKh : article.titleEn }}
        </h1>
      </div>

      <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200 max-h-[450px]">
        <img :src="article.imageUrl" :alt="article.titleEn" class="w-full h-full object-cover" />
      </div>

      <!-- HTML Article Content -->
      <div
        class="prose max-w-none text-slate-800 leading-relaxed text-sm sm:text-base font-sans space-y-4"
        v-html="locale === 'km' ? article.contentKh : article.contentEn"
      ></div>

      <!-- Social Share Buttons -->
      <div class="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Share Article:</span>
        <div class="flex items-center gap-2">
          <button @click="share('facebook')" class="px-4 py-2 bg-[#1877F2] text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow">
            <span>Facebook</span>
          </button>
          <button @click="share('telegram')" class="px-4 py-2 bg-[#229ED9] text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow">
            <span>Telegram</span>
          </button>
          <button @click="share('copy')" class="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 shadow">
            <span>{{ copySuccess ? 'Copied!' : 'Copy Link' }}</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const slug = route.params.slug as string
const copySuccess = ref(false)

const { data, pending } = await useFetch<{ data: any }>(`/api/news/${slug}`)
const article = computed(() => data.value?.data)

useSeoMeta({
  title: () => (article.value ? `${article.value.titleEn} | MPWT IT Systems` : 'News Article'),
  description: () => article.value?.excerptEn || 'MPWT IT Systems news detail.'
})

function share(platform: string) {
  const url = window.location.href
  if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  if (platform === 'telegram') window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank')
  if (platform === 'copy') {
    navigator.clipboard.writeText(url)
    copySuccess.value = true
    setTimeout(() => (copySuccess.value = false), 3000)
  }
}
</script>
