/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        'rise-in': {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0%)" },
        },
        'rise-out': {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
      },

      animation: {
        'rise-in': 'rise-in 300ms ease-out',
        'rise-out': 'rise-out 300ms ease-out',
      }
    },
  },
  plugins: [],
}
