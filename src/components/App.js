import React from 'react';
import List from './List/List.js';
import List2 from './v2/List2.js';
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
        <List2 />
      </ThemeProvider>
    </div>
  );
}

export default App;