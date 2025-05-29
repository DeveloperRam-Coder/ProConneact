/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#BBDEFB',
        white: '#FFFFFF'
      },
    },
  },
  plugins: [],
}

