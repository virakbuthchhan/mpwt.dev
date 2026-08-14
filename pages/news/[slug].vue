<template>
  <div v-if="pending" class="py-16 max-w-4xl mx-auto px-4 space-y-4">
    <div class="h-8 bg-slate-200 animate-pulse rounded w-3/4"></div>
    <div class="h-64 bg-slate-200 animate-pulse rounded-xl"></div>
  </div>

  <div v-else-if="!article" class="py-20 text-center space-y-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold text-slate-800">Article Not Found</h2>
    <NuxtLink to="/news" class="px-4 py-2 bg-gov-navy text-white rounded text-xs font-bold inline-block">
      Back to News List
    </NuxtLink>
  </div>

  <article v-else class="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-slate-500">
      <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      <span>/</span>
      <NuxtLink to="/news" class="hover:underline">News</NuxtLink>
      <span>/</span>
      <span class="truncate max-w-xs text-slate-700 font-semibold">{{ title }}</span>
    </div>

    <!-- Title & Meta -->
    <div class="space-y-4">
      <span class="px-3 py-1 bg-gov-navy text-gov-gold rounded text-xs font-bold uppercase tracking-wider inline-block">
        {{ article.category }}
      </span>

      <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-khmer">
        {{ title }}
      </h1>

      <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-y border-slate-200 py-3">
        <div class="flex items-center gap-4">
          <span>✍️ {{ article.author }}</span>
          <span>📅 {{ article.publishedAt }}</span>
          <span>👁 {{ article.views }} views</span>
        </div>

        <!-- Social Share Bar -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-700 mr-1">{{ $t('news.share') }}:</span>

          <!-- Facebook -->
          <button
            @click="shareFacebook"
            class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow-sm"
            title="Share on Facebook"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          <!-- Telegram -->
          <button
            @click="shareTelegram"
            class="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition shadow-sm"
            title="Share on Telegram"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.754-.17.706-.43 1.05-.68 1.073-.55.05-.97-.364-1.5-.712-.83-.545-1.298-.883-2.105-1.415-.933-.614-.328-.951.204-1.504.14-.144 2.55-2.336 2.597-2.535.006-.025.01-.12-.046-.17-.056-.05-.14-.033-.2-.02-.085.019-1.436.912-4.053 2.68-.383.264-.73.393-1.041.386-.343-.008-1.002-.194-1.492-.353-.601-.195-1.078-.298-1.036-.63.022-.172.261-.348.718-.528 2.81-1.224 4.686-2.03 5.626-2.42 2.68-1.11 3.238-1.303 3.6-1.31.08 0 .257.02.37.112.096.078.123.184.135.258.012.075.027.245.015.38z"/>
            </svg>
          </button>

          <!-- Twitter / X -->
          <button
            @click="shareTwitter"
            class="p-2 bg-slate-900 hover:bg-black text-white rounded-full transition shadow-sm"
            title="Share on X"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>

          <!-- Copy Link -->
          <button
            @click="copyLink"
            class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold text-[11px] transition border border-slate-300 flex items-center gap-1"
          >
            <span>🔗</span>
            <span>{{ copied ? $t('news.linkCopied') : $t('news.copyLink') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200 max-h-[450px]">
      <img :src="article.imageUrl" :alt="title" class="w-full h-full object-cover" />
    </div>

    <!-- Article Content -->
    <div class="prose max-w-none text-slate-800 leading-relaxed text-sm sm:text-base" v-html="content"></div>

    <!-- Related News -->
    <div class="pt-12 border-t border-slate-200 space-y-6">
      <h3 class="text-xl font-bold text-gov-navy font-khmer">
        {{ $t('news.relatedNews') }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsCard v-for="rel in relatedNews" :key="rel.id" :article="rel" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import NewsCard from '~/components/NewsCard.vue'

const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string
const { data, pending } = await useFetch<{ data: any }>(`/api/news/${slug}`)
const { data: allNews } = await useFetch<{ data: any[] }>('/api/news')

const article = computed(() => data.value?.data)
const title = computed(() => (locale.value === 'km' ? article.value?.titleKh : article.value?.titleEn))
const content = computed(() => (locale.value === 'km' ? article.value?.contentKh : article.value?.contentEn))

const relatedNews = computed(() =>
  allNews.value?.data.filter((n) => n.id !== article.value?.id).slice(0, 2) || []
)

const copied = ref(false)

function copyLink() {
  if (process.client) {
    navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  }
}

function shareFacebook() {
  if (process.client) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')
  }
}

function shareTelegram() {
  if (process.client) {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title.value || '')}`, '_blank')
  }
}

function shareTwitter() {
  if (process.client) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title.value || '')}`, '_blank')
  }
}

watchEffect(() => {
  if (article.value) {
    useSeoMeta({
      title: `${title.value} | MPWT News`,
      ogTitle: title.value,
      description: article.value.excerptEn || article.value.excerptKh,
      ogImage: article.value.imageUrl
    })
  }
})
</script>
