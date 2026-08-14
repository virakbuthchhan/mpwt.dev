<template>
  <div class="min-h-screen flex flex-col bg-gov-surface text-slate-900 font-latin">
    <AnnouncementTicker />
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AccessibilityToolbar />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
const siteStore = useSiteStore()

onMounted(() => {
  siteStore.fetchSettings()
})
</script>
