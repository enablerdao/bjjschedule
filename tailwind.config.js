/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bjj-blue': '#1E40AF',    // Blue belt
        'bjj-blue-dark': '#1E3A8A', // Darker blue for hover states
        'bjj-green': '#10B981',   // Green belt
        'bjj-gold': '#F59E0B',    // Gold medals
        'bjj-red': '#DC2626',     // Red belt
        'bjj-black': '#1F2937',   // Black belt
        'bjj-white': '#F3F4F6',   // White belt
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};