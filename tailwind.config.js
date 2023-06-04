/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'themecolor': "#a72c63",
        'textcolor': "#662277",
        'loginbg': "f4ecec"
      },
    },
    
  },
  plugins: [],
}