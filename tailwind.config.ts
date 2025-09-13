
import type { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        card: 'var(--card)',
        border: 'var(--border)'
      }
    }
  },
  safelist: [
    { pattern: /(bg|text|border)-(primary|success|danger)/ }
  ],
  plugins: []
} satisfies Config
