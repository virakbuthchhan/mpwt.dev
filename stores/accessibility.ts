import { defineStore } from 'pinia'

export type FontFamily = 'google-sans' | 'inter' | 'battambang' | 'dyslexic'
export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemeColor = '#293375' | '#0f766e' | '#0284c7' | '#7c3aed'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => ({
    fontFamily: 'google-sans' as FontFamily,
    themeColor: '#293375' as ThemeColor,
    fontSizeLevel: 1, // 0 = 90%, 1 = 100%, 2 = 115%, 3 = 130%
    themeMode: 'light' as ThemeMode,
    highContrast: false
  }),

  getters: {
    fontScale: (state) => {
      if (state.fontSizeLevel === 0) return 0.9
      if (state.fontSizeLevel === 2) return 1.15
      if (state.fontSizeLevel === 3) return 1.3
      return 1.0
    }
  },

  actions: {
    initAccessibility() {
      if (process.client) {
        const saved = localStorage.getItem('mpwt_settings_drawer')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            this.fontFamily = parsed.fontFamily || 'google-sans'
            this.themeColor = parsed.themeColor || '#293375'
            this.fontSizeLevel = parsed.fontSizeLevel ?? 1
            this.themeMode = parsed.themeMode || 'light'
            this.highContrast = parsed.highContrast ?? false
          } catch (e) {
            console.error('Failed parsing settings drawer state', e)
          }
        }

        // Listen to system dark mode changes if set to system
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (this.themeMode === 'system') {
            this.applySettings()
          }
        })

        this.applySettings()
      }
    },

    setFontFamily(family: FontFamily) {
      this.fontFamily = family
      this.applySettings()
    },

    setThemeColor(color: ThemeColor) {
      this.themeColor = color
      this.applySettings()
    },

    setFontSizeLevel(level: number) {
      this.fontSizeLevel = level
      this.applySettings()
    },

    setThemeMode(mode: ThemeMode) {
      this.themeMode = mode
      this.applySettings()
    },

    toggleHighContrast() {
      this.highContrast = !this.highContrast
      this.applySettings()
    },

    resetSettings() {
      this.fontFamily = 'google-sans'
      this.themeColor = '#293375'
      this.fontSizeLevel = 1
      this.themeMode = 'light'
      this.highContrast = false
      this.applySettings()
    },

    applySettings() {
      if (!process.client) return

      // Save to localStorage
      localStorage.setItem(
        'mpwt_settings_drawer',
        JSON.stringify({
          fontFamily: this.fontFamily,
          themeColor: this.themeColor,
          fontSizeLevel: this.fontSizeLevel,
          themeMode: this.themeMode,
          highContrast: this.highContrast
        })
      )

      // Apply root HTML variable font scale & primary theme color
      document.documentElement.style.setProperty('--font-scale', String(this.fontScale))
      document.documentElement.style.setProperty('--primary-color', this.themeColor)

      // Apply font family font class on html
      document.documentElement.classList.remove('font-google-sans', 'font-inter', 'font-battambang', 'accessibility-dyslexic')
      if (this.fontFamily === 'google-sans') document.documentElement.classList.add('font-google-sans')
      if (this.fontFamily === 'inter') document.documentElement.classList.add('font-inter')
      if (this.fontFamily === 'battambang') document.documentElement.classList.add('font-battambang')
      if (this.fontFamily === 'dyslexic') document.documentElement.classList.add('accessibility-dyslexic')

      // Apply theme mode (light, dark, system)
      let isDark = false
      if (this.themeMode === 'dark') isDark = true
      if (this.themeMode === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // Apply high contrast class
      if (this.highContrast) {
        document.documentElement.classList.add('accessibility-high-contrast')
      } else {
        document.documentElement.classList.remove('accessibility-high-contrast')
      }
    }
  }
})
