/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'gather-purple': '#6366f1',
        'gather-pink': '#ec4899',
        'gather-green': '#10b981',
        'gather-dark': '#0f172a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 20s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
