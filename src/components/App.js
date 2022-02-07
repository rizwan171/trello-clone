import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import List from "./List/main/List";
import AddList from "./List/AddList/AddList";
import NavBar from "./NavBar/NavBar";
import BoardOptionsMenu from "./BoardOptionsMenu/BoardOptionsMenu";
import { useDispatch } from "react-redux";
import { reorderList } from "../features/listsSlice";

const App = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.value);
  const showBoard = useSelector((state) => state.boardOptions.value);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "list") {
      const newListsOrder = [...lists];
      const listToMove = newListsOrder.find(list => list.id === draggableId);

      newListsOrder.splice(source.index, 1);
      newListsOrder.splice(destination.index, 0, listToMove);

      dispatch(reorderList(newListsOrder));
    } else {
      // const sourceList = data.lists[source.droppableId];
      // const destList = data.lists[destination.droppableId];
      // const draggingCard = sourceList.cards.find((card) => card.id === draggableId);
      // if (source.droppableId === destination.droppableId) {
      //   sourceList.cards.splice(source.index, 1);
      //   destList.cards.splice(destination.index, 0, draggingCard);
      //   const newData = {
      //     ...data,
      //     lists: {
      //       ...data.lists,
      //       [sourceList.id]: destList,
      //     },
      //   };
      //   setData(newData);
      // } else {
      //   sourceList.cards.splice(source.index, 1);
      //   destList.cards.splice(destination.index, 0, draggingCard);
      //   const newData = {
      //     ...data,
      //     lists: {
      //       ...data.lists,
      //       [sourceList.id]: sourceList,
      //       [destList.id]: destList,
      //     },
      //   };
      //   setData(newData);
      // }
    }
  };

  const className = showBoard ? "mr-1/5" : "";

  return (
    <div className={className}>
      <NavBar />
      {showBoard && <BoardOptionsMenu />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div className="flex px-6 pt-3 overflow-x-auto h-full" ref={provided.innerRef} {...[provided.droppableProps]}>
              {lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))}
              <div>
                <AddList />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
