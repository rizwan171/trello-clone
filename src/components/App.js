import React from 'react';
import List from './List/List.js';
import '../css/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <List />
      </ThemeProvider>
    </div>
  );
}

export default App;