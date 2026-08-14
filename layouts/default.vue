<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
    <!-- Top Announcement Ticker -->
    <AnnouncementTicker />

    <!-- Main Public Header -->
    <AppHeader />

    <!-- Dynamic Page Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Interactive Settings & Display Drawer -->
    <SettingsDrawer />

    <!-- Public Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AnnouncementTicker from '~/components/AnnouncementTicker.vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import SettingsDrawer from '~/components/SettingsDrawer.vue'
</script>
