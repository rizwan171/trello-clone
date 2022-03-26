module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'trello-gray': {
          100: '#ebecf0', // list background
          200: '#768295', // list more icon, add card X icon
          300: '#172b4d', // list title
          400: '#f4f5f7', // list card hover
          500: '#dadbe2', // more icon hover, add card hover
          600: '#3d4d69', // add card icon and text
          'card-modal-buttons': '#EAECF0',
          'card-modal-buttons-hover': '#E2E4E9',
        },
        'trello-blue': {
          100: '#0079bf', // title edit border, add card border
          200: '#006098', // image options upload hover
          'card-modal-button-text': '#091e42'
        },
        'trello-green': {
          100: '#5aac44',
          200: '#488a36',
        },
      },
      borderRadius: {
        ibsm: '0.25rem'
      },
      transitionProperty: {
        'height': 'height'
      },
      height: {
        '38': '152px',
        '218': '654px',
      },
      width: {
        '218': '654px',
        '76': '304px'
      },
      minHeight: {
        '4': '16px',
      },
      borderWidth: {
        '1': '1px',
        '3': '3px'
      },
      margin: {
        '1/5': '20%'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderStyle: ['hover', 'focus'],
      borderWidth: ['hover', 'focus'],
    }
  },
  plugins: [],
}
