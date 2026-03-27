import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        accent: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#FFFFFF',
        surface: '#F9F9F9',
        border: '#E5E5E5',
        'text-primary': '#0A0A0A',
        'text-secondary': '#6B6B6B',
        accent: '#111111',
        'accent-blue': '#2563EB',
        'accent-emerald': '#10B981',
        error: '#EF4444',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}

export default config
