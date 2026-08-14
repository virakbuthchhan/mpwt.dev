import { useAccessibilityStore } from '~/stores/accessibility'

export const useAccessibility = () => {
  const store = useAccessibilityStore()
  return {
    fontSizeLevel: computed(() => store.fontSizeLevel),
    highContrast: computed(() => store.highContrast),
    dyslexiaFont: computed(() => store.dyslexiaFont),
    fontScale: computed(() => store.fontScale),
    increaseFontSize: store.increaseFontSize,
    decreaseFontSize: store.decreaseFontSize,
    toggleHighContrast: store.toggleHighContrast,
    toggleDyslexiaFont: store.toggleDyslexiaFont,
    resetSettings: store.resetSettings,
    initAccessibility: store.initAccessibility
  }
}
