/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in-scale': 'fadeInScale 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-out infinite'
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInScale: {
          'from': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          'to': { opacity: '1', transform: 'scale(1) translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        }
      }
    },
  },
  plugins: [],
}
