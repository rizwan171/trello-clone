import React, { useState } from 'react';
import List from './List/main/List.js';
import testData from '../temp/testData.js';

function App() {
  const [data, setData] = useState(testData);

  return (
    <div>
      { data.listIds.map(id => <List key={id} list={data.lists[id]} />) }
    </div>
  );
}

export default App;