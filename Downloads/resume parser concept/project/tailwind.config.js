/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D2D2D',
        coral: '#FF6B6B',
        ivory: '#F8F1E9',
        olive: '#4A7043',
        'coral-light': '#FF9999',
        'olive-light': '#6A9063',
        'charcoal-light': '#4D4D4D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};