import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './List/main/List.js';
import testData from '../temp/testData.js';
import { AddCardContext } from '../contexts/AddCardContext.js';
import AddList from './List/AddList/AddList.js';
import { AddListContext } from '../contexts/AddListContext.js';

function App() {
  const [data, setData] = useState(testData);

  const addCard = (text, listId) => {
    const newCard = {
      id: uuidv4(),
      content: text
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    };

    setData(newData);
  };

  const addList = (title) => {
    const listId = uuidv4();
    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: {
          id: listId,
          title,
          cards: []
        },
      },
      listIds: [
        ...data.listIds,
        listId
      ]
    };

    setData(newData);
  }

  return (
    <div className='flex w-full mt-11'>
      <AddCardContext.Provider value={addCard}>
        <AddListContext.Provider value={addList}>
          { data.listIds.map(id => <List key={id} list={data.lists[id]} />) }
          <AddList />
        </AddListContext.Provider>
      </AddCardContext.Provider>
    </div>
  );
}

export default App;