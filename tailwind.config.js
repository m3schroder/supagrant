/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT:"#3fcf8e",
          hovered:"#34b27b",
        }
      },
      borderWidth:{
        "1":"1px"
      }

    },
  },
  plugins: [],
}
