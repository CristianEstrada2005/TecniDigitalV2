/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a192f',
          50: '#e6eaf0',
          100: '#c1cce0',
          200: '#9aadd0',
          300: '#738dc0',
          400: '#4c6eb0',
          500: '#254fa0',
          600: '#1e4080',
          700: '#173060',
          800: '#102040',
          900: '#0a192f',
          950: '#050c17',
        },
        cyan: {
          DEFAULT: '#00d4ff',
          50: '#e6f9ff',
          100: '#b3f0ff',
          200: '#80e7ff',
          300: '#4ddeff',
          400: '#1ad5ff',
          500: '#00d4ff',
          600: '#00aacc',
          700: '#008099',
          800: '#005566',
          900: '#002b33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'hover-scale': 'hoverScale 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hoverScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
