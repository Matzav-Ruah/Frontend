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
        ind_good: '#5C8DFF',
        ind_neutral: '#5A4FCF',
        ind_bad: '#5846A8',
      },
    },
  },
  plugins: [],
}
