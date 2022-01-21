import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './List/main/List.js';
import testData from '../temp/testData.js';
import { AddCardContext } from '../contexts/AddCardContext.js';
import AddList from './List/AddList/AddList.js';
import { AddListContext } from '../contexts/AddListContext.js';
import { UpdateTitleContext } from '../contexts/UpdateTitleContext.js';
import { DragDropContext } from 'react-beautiful-dnd';

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

  const updateListTitle = (newTitle, listId) => {
    const list = data.lists[listId];
    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: {
          ...list,
          title: newTitle
        }
      }
    };

    setData(newData);
  }

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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceList = data.lists[source.droppableId];
    const destList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.find(card => card.id === draggableId);
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destList.cards.splice(destination.index, 0, draggingCard);

      const newData = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destList
        }
      };

      setData(newData);
    }
  }

  return (
    <div className='flex w-full mt-11 overflow-y-auto'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <AddListContext.Provider value={addList}>
          <UpdateTitleContext.Provider value={updateListTitle}>
            <AddCardContext.Provider value={addCard}>
              {data.listIds.map(id => <List key={id} list={data.lists[id]} />)}
              <AddList />
            </AddCardContext.Provider>
          </UpdateTitleContext.Provider>
        </AddListContext.Provider>
      </DragDropContext>
    </div>
  );
}

export default App;