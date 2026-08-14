import { useAccessibilityStore } from '~/stores/accessibility'

export default defineNuxtPlugin((nuxtApp) => {
  const store = useAccessibilityStore()
  store.initAccessibility()
})
