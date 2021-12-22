import React, { useState } from 'react';
import List from './List/main/List.js';

function App() {
  const theme = createTheme();

  return (
    <div>
      <List />
    </div>
  );
}

export default App;