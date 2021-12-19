module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'trello-gray': {
          100: '#ebecf0', // list background
          200: '#768295', // list more icom
          300: '#172b4d', // list title
          400: '#f4f5f7', // list card hover
          500: '#dadbe2', // more icon hover, add card hover
          600: '#3d4d69', // add card icon and text
        },
        'trello-blue': {
          100: '#0079bf', // title edit border
        }
      },
      borderRadius: {
        ibsm: '0.25rem'
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
