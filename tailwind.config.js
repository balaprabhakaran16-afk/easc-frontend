/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {

      colors: {

        collegeGreen: "#0F7A3D",
        collegeYellow: "#F2D335",
        collegePink: "#E879B9"

      }

    },
  },
  plugins: [],
}