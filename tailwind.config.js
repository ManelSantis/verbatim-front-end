/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens:{
        'sm': '300px'
      },
      fontFamily:{
        'jomhuria': ['Jomhuria'],
        'jockey-one': ['Jockey One']
      }
    },
  },
  plugins: [],
}

