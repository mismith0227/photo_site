const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.column-count-2': {
          'column-count': 2,
        },
        '.column-count-3': {
          'column-count': 3,
        },
        '.column-count-4': {
          'column-count': 4,
        },
        '.break-inside': {
          'page-break-inside': 'avoid',
          'break-inside': 'avoid',
        },
      }

      addUtilities(newUtilities)
    }),
  ],
}
