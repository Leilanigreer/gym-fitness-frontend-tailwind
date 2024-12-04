// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      colors: {
        'primary': '#5D3E8D',
        'secondary': '#7E5BB7',
        'accent': '#FD9843',
        'orange-background': '#FFEAD9',
        'burnt-orange': "#BF5600",
        'background': '#F1EDE6',
      }
    },
  },
  plugins: [],
}