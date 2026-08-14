/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#1a2e5a',
          'navy-dark': '#101e3d',
          'navy-light': '#29437e',
          gold: '#c9a84c',
          'gold-light': '#e5cb7a',
          'gold-dark': '#9b7d2f',
          red: '#c02b2b',
          surface: '#f5f6fa',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        khmer: ['Noto Sans Khmer', 'Battambang', 'sans-serif'],
        latin: ['Inter', 'system-ui', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif']
      }
    }
  },
  plugins: []
}
