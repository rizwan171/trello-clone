import React from 'react';
import List from './List/main/List.js';
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