/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@ntv360/component-pantry/tailwind-preset.js')],
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@ntv360/component-pantry/**/*.{mjs,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

