import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import List from './List/main/List.js';
import testData from '../temp/testData.js';
import AddList from './List/AddList/AddList.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import NavBar from './NavBar/NavBar.js';
import BoardOptionsMenu from './BoardOptionsMenu/BoardOptionsMenu.js';
import { useSelector } from 'react-redux';

function App() {
  const [data, setData] = useState(testData);
  const [open, setOpen] = useState(true); //TODO : set false after implementation

  const lists = useSelector((state) => state.lists.value);

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
    <>
      <NavBar />
      <BoardOptionsMenu open={open} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) =>
            <div className='flex w-full px-6 pt-3 overflow-x-auto' ref={provided.innerRef} {...[provided.droppableProps]}>
              {lists.map((list, index) => <List key={list.id} list={list} index={index} />)}
              {provided.placeholder}
              <AddList />
            </div>
          }
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;