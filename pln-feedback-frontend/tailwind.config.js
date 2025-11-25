/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pln-teal': '#1A5D6D',
        'pln-cyan': '#1CB5C4',
      }
    },
  },
  plugins: [],
}