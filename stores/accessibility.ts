import { defineStore } from 'pinia'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => ({
    fontSizeLevel: 0, // 0 = 100%, 1 = 115%, 2 = 130%
    highContrast: false,
    dyslexiaFont: false
  }),
  getters: {
    fontScale: (state) => {
      if (state.fontSizeLevel === 1) return 1.15
      if (state.fontSizeLevel === 2) return 1.3
      return 1.0
    }
  },
  actions: {
    initAccessibility() {
      if (process.client) {
        const saved = localStorage.getItem('mpwt_a11y_settings')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            this.fontSizeLevel = parsed.fontSizeLevel ?? 0
            this.highContrast = parsed.highContrast ?? false
            this.dyslexiaFont = parsed.dyslexiaFont ?? false
          } catch (e) {
            console.error('Failed parsing a11y settings', e)
          }
        }
        this.applySettings()
      }
    },
    increaseFontSize() {
      if (this.fontSizeLevel < 2) {
        this.fontSizeLevel++
        this.applySettings()
      }
    },
    decreaseFontSize() {
      if (this.fontSizeLevel > 0) {
        this.fontSizeLevel--
        this.applySettings()
      }
    },
    toggleHighContrast() {
      this.highContrast = !this.highContrast
      this.applySettings()
    },
    toggleDyslexiaFont() {
      this.dyslexiaFont = !this.dyslexiaFont
      this.applySettings()
    },
    resetSettings() {
      this.fontSizeLevel = 0
      this.highContrast = false
      this.dyslexiaFont = false
      this.applySettings()
    },
    applySettings() {
      if (!process.client) return

      // Save to localStorage
      localStorage.setItem(
        'mpwt_a11y_settings',
        JSON.stringify({
          fontSizeLevel: this.fontSizeLevel,
          highContrast: this.highContrast,
          dyslexiaFont: this.dyslexiaFont
        })
      )

      // Apply root HTML variable font scale
      document.documentElement.style.setProperty('--font-scale', String(this.fontScale))

      // Apply high contrast class
      if (this.highContrast) {
        document.documentElement.classList.add('accessibility-high-contrast')
      } else {
        document.documentElement.classList.remove('accessibility-high-contrast')
      }

      // Apply dyslexia font class
      if (this.dyslexiaFont) {
        document.documentElement.classList.add('accessibility-dyslexic')
      } else {
        document.documentElement.classList.remove('accessibility-dyslexic')
      }
    }
  }
})
