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
        'color5': "#E6FFDE",
        // 'sideBarColor1': "#DFBFB5",
        // 'color2': "#F0D7D1",
        // 'color3': "#BC8D79",
        // 'color4': "#B14B60",
        // 'color5': "#FFE8EB",
        "logoutButton": "#F65454",
        'check': "#094abc"
      },
      spacing: {
        '95': '95%'
      }
    },
    
  },
  plugins: [],
}