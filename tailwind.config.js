/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        electric: {
          blue: '#00B9F1',
          cyan: '#00E5FF',
          deep: '#0085B2',
          glow: '#38D4FF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'electric': '0 0 20px rgba(0, 185, 241, 0.45)',
        'electric-sm': '0 0 10px rgba(0, 185, 241, 0.3)',
        'electric-lg': '0 0 35px rgba(0, 185, 241, 0.65)',
        'monochrome': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'monochrome-dark': '0 4px 25px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
