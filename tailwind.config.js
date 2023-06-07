/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'themecolor': "#A2B29F",
        'textcolor': "#000000",
        'loginbg': "#f4ecec", 
        'sideBarColor1': "#BDD2B6",
        'color2': "#FDFCDC",
        'color3': "#A2B29F",
        'color4': "#798777",
        'color5': "#FFD2D7",
      },
      spacing: {
        '95': '95%'
      }
    },
    
  },
  plugins: [],
}