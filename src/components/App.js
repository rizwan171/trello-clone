import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import List from "./List/main/List";
import AddList from "./List/AddList/AddList";
import NavBar from "./NavBar/NavBar";
import BoardOptionsMenu from "./BoardOptionsMenu/BoardOptionsMenu";
import { useDispatch } from "react-redux";
import { updateAllLists } from "../features/listsSlice";
import { updateAllCards } from "../features/cardsSlice";
import CardModal from "./CardModal/CardModal";
import ListOptionsMenu from "./List/ListOptionsMenu/ListOptionsMenu";

const App = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.value);
  const cards = useSelector((state) => state.cards.value);
  const showBoard = useSelector((state) => state.boardOptions.value);
  const currentSelectedCard = useSelector((state) => state.currentSelectedCard.value);
  const currentSelectedList = useSelector((state) => state.currentSelectedList.value);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    const newListsOrder = [...lists];

    if (!destination) return;

    if (type === "list") {
      const listToMove = newListsOrder.find((list) => list.id === draggableId);

      newListsOrder.splice(source.index, 1);
      newListsOrder.splice(destination.index, 0, listToMove);

      dispatch(updateAllLists(newListsOrder));
    } else {
      const draggingCard = cards.find((card) => card.id === draggableId);

      // within the same list
      if (source.droppableId === destination.droppableId) {
        const listCards = cards.filter((card) => card.listId == destination.droppableId);
        const otherCards = cards.filter((card) => card.listId !== destination.droppableId);

        listCards.splice(source.index, 1);
        listCards.splice(destination.index, 0, draggingCard);

        const newCardsOrder = listCards.concat(otherCards);
        dispatch(updateAllCards(newCardsOrder));
      } else { // dragging to different lists
        const copyOfDraggingCard = { ...draggingCard };
        copyOfDraggingCard.listId = destination.droppableId;

        const sourceListCards = cards.filter((card) => card.listId === source.droppableId && card.id !== draggingCard.id);
        const destListCards = cards.filter((card) => card.listId === destination.droppableId);
        const otherCards = cards.filter((card) => card.listId !== source.droppableId && card.listId !== destination.droppableId);

        destListCards.splice(destination.index, 0, copyOfDraggingCard);

        const newCardsOrder = sourceListCards.concat(destListCards).concat(otherCards);
        dispatch(updateAllCards(newCardsOrder));
      }
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
      {currentSelectedCard && <CardModal card={currentSelectedCard}/>}
      {currentSelectedList && <ListOptionsMenu list={currentSelectedList}/>}
    </div>
  );
};

export default App;
