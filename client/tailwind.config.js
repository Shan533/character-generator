/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#89CFF0',
        'light-blue': '#BFE6FF',
        'vibrant-green': '#7FFFD4',
        'light-green': '#AAFCE9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

