/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#657D9E',
        secondary: '#9DB2CE',
        background: '#CFDCED',
        light_third: '#A8D5F2',
        third: '#7CCDFC',
        ind_good: '#5C8DFF',
        ind_neutral: '#5A4FCF',
        ind_bad: '#5846A8',
        streak: '#4ADE80',
      },
    },
  },
  plugins: [],
}
