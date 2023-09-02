/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        'sm': '300px'
      },
      fontFamily: {
        'poppins': ["Poppins"],
        'inter': ["Inter"],
        'jomhuria': ['Jomhuria'],
        'jockey-one': ['Jockey One']
      },
      colors: {
        "light-red": '#f52c15',
        "medium-red": '#d32110',
        "vivid-red": '#b1160b',
        "dark-red": '#900b05',
        "really-dark-red": '#6e0000'
      }
    },
  },
  plugins: [],
}

