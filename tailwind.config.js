// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5D3E8D',  // purple
        'secondary': '#7E5BB7', //  light purple
        'accent': '#FD9843',    // light orange
        'orange-background' : '#FFEAD9',
        'burnt-orange' : "#BF5600",
        'background': '#F1EDE6', // beige background
      }
    },
  },
  plugins: [],
}



