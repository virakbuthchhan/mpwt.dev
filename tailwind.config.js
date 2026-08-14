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
          navy: '#293375',
          'navy-dark': '#1b2252',
          'navy-light': '#384699',
          gold: '#c9a84c',
          'gold-light': '#e5cb7a',
          'gold-dark': '#9b7d2f',
          accent: '#38bdf8',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['"Google Sans"', '"Google Sans Text"', 'Inter', 'system-ui', 'sans-serif'],
        khmer: ['"Noto Sans Khmer"', 'Battambang', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif']
      }
    }
  },
  plugins: []
}
