/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF2F8',
          100: '#D6E5F1',
          200: '#ADCBE3',
          300: '#84B1D5',
          400: '#5B97C7',
          500: '#327DB9',
          600: '#2563A0',
          700: '#1B4F72',
          800: '#153D58',
          900: '#0E2B3E',
        },
        accent: {
          50: '#FDF3E7',
          100: '#FAE7CF',
          200: '#F5CF9F',
          300: '#F0B76F',
          400: '#EB9F3F',
          500: '#E67E22',
          600: '#C96B12',
          700: '#A0550E',
          800: '#773F0A',
          900: '#4E2A07',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(27, 79, 114, 0.08), 0 1px 3px rgba(27, 79, 114, 0.06)',
        'card-hover': '0 8px 24px rgba(27, 79, 114, 0.14), 0 2px 8px rgba(27, 79, 114, 0.10)',
      },
    },
  },
  plugins: [],
};
