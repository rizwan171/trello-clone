import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import store from '../app/store.js';
import List from './List/main/List.js';
import testData from '../temp/testData.js';
import AddList from './List/AddList/AddList.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import NavBar from './NavBar/NavBar.js';
import BoardOptionsMenu from './BoardOptionsMenu/BoardOptionsMenu.js';

function App() {
  const [data, setData] = useState(testData);
  const [open, setOpen] = useState(true); //TODO : set false after implementation

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
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        listIds: [...newListIds]
      };
      setData(newData);
    } else {
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
      } else {
        sourceList.cards.splice(source.index, 1);
        destList.cards.splice(destination.index, 0, draggingCard);

        const newData = {
          ...data,
          lists: {
            ...data.lists,
            [sourceList.id]: sourceList,
            [destList.id]: destList
          }
        };
        setData(newData);
      }
    }
  }

  return (
    <Provider store={store}>
      <NavBar />
      <BoardOptionsMenu open={open} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) =>
            <div className='flex w-full px-6 pt-3 overflow-x-auto' ref={provided.innerRef} {...[provided.droppableProps]}>
              {data.listIds.map((id, index) => <List key={id} list={data.lists[id]} index={index} />)}
              {provided.placeholder}
              <AddList />
            </div>
          }
        </Droppable>
      </DragDropContext>
    </Provider>
  );
}

export default App;