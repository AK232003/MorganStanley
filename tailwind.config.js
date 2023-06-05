/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'themecolor': "#a72c63",
        'textcolor': "#ffffff",
        'loginbg': "f4ecec",
        'sideBarColor1': "#362740",
        'color2': "#69BF64",
        'color3': "#6E7DAB",
        'color4': "#E95CA1"
      },
    },
    
  },
  plugins: [],
}