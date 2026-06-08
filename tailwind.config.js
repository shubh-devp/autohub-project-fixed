/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0D2137',
          800: '#112740',
          700: '#1A3C5E',
          600: '#234E7A',
          400: '#2E6DA4',
        },
        lightBlue: '#EBF2FA',
        orange: {
          100: '#FDE8DC',
          300: '#F5925E',
          500: '#E8622A',
          600: '#CF4F1D',
        },
        green: {
          600: '#2E7D4F',
        },
        amber: {
          500: '#D97706',
        },
        red: {
          50: '#FEF2F2',
          200: '#FECACA',
          600: '#DC2626',
          700: '#B91C1C',
        },
        slate: {
          50:  '#F9FAFB',
          100: '#F4F7FB',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          600: '#6B7E8E',
          700: '#475569',
          900: '#1C2B3A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '56px', fontWeight: '700' }],
        h1:      ['32px', { lineHeight: '40px', fontWeight: '600' }],
        h2:      ['24px', { lineHeight: '32px', fontWeight: '600' }],
        h3:      ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg':['18px', { lineHeight: '28px', fontWeight: '400' }],
        base:    ['16px', { lineHeight: '24px', fontWeight: '400' }],
        sm:      ['14px', { lineHeight: '20px', fontWeight: '400' }],
        xs:      ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        full: '9999px',
      },
      boxShadow: {
        sm:  '0 1px 2px rgba(0,0,0,0.05)',
        md:  '0 4px 12px rgba(0,0,0,0.10)',
        lg:  '0 8px 24px rgba(0,0,0,0.12)',
        xl:  '0 0 0 3px rgba(232,98,42,0.25)',
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(-4px)' },
          '75%':      { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
};