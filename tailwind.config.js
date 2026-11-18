/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.035em',
      },
      maxWidth: {
        site: '1200px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
      boxShadow: {
        soft: '0 2px 6px rgb(0 0 0 / 0.04), 0 12px 32px rgb(0 0 0 / 0.06)',
        lift: '0 4px 12px rgb(0 0 0 / 0.06), 0 24px 64px rgb(0 0 0 / 0.10)',
      },
    },
  },
  plugins: [],
};
