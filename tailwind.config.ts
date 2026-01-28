import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-header':
          'oklch(var(--background-header) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

export default config
