import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F8D7DA',
        secondary: '#FAE1C3',
        accent: '#C9A9A6',
        background: '#FFF9F4',
        'text-dark': '#3E2C2C',
        cream: '#FFF9F4',
        'dusty-rose': '#C9A9A6',
        'soft-pink': '#F8D7DA',
        'warm-peach': '#FAE1C3',
        'warm-charcoal': '#3E2C2C',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        button: '999px',
      },
      boxShadow: {
        warm: '0 4px 24px rgba(62, 44, 44, 0.10)',
        'warm-lg': '0 8px 40px rgba(62, 44, 44, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
