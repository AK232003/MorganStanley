/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'themecolor': "#A72C63",
        'textcolor': "#000000",
        'loginbg': "#f4ecec", 
        'sideBarColor1': "#E8D8D8",
        'sideBarColor2': "#362740",
        'color2': "#f4ecec",
        'color3': "#E8D8D8",
        'color6': "#CCCCCC",
        'color4': "#798777",
        'color5': "#FFFFFF",
        'cardColor': "#FFFFFF",
        // 'sideBarColor1': "#DFBFB5",
        // 'color2': "#F0D7D1",
        // 'color3': "#BC8D79",
        // 'color4': "#B14B60",
        // 'color5': "#FFE8EB",
        "logoutButton": "#E8D8D8",
        "logoutContent": "#D50000",
        'check': "#094abc",
        'buttonColor': "#A72C63",
      },
      spacing: {
        '95': '95%',
        '70': '70%'
      }
    },
    
  },
  plugins: [],
}