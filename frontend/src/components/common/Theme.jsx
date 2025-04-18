// Theme.jsx - This file defines a custom dark theme for a React application using Material-UI.
// It sets the primary and secondary colors, background colors, text colors, and typography.

import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#141414',
    },
    secondary: {
      main: '#4db6ac',
    },
    background: {
      default: '#303030',
      paper: '#424242',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
  },
},
  typography: {
    fontFamily: 'Quicksand'
  },
  
})