import { useEffect } from "react";
import { DragDropContext, DragUpdate, Droppable } from "react-beautiful-dnd";
import { useAppSelector } from "../app/hooks";
import List from "./List/main/List";
import AddList from "./List/AddList/AddList";
import NavBar from "./NavBar/NavBar";
import BoardOptionsMenu from "./BoardOptionsMenu/BoardOptionsMenu";
import { useDispatch } from "react-redux";
import { updateAllLists } from "../features/listsSlice";
import { updateAllCards } from "../features/cardsSlice";
import CardModal from "./CardModal/CardModal";
import ListOptionsMenu from "./List/ListOptionsMenu/ListOptionsMenu";
import { setNewBoardState } from "../features/boardSlice";
import Card from "../types/Card";

const App = () => {
  const dispatch = useDispatch();
  const board = useAppSelector((state) => state.board.value);
  const lists = useAppSelector((state) => state.lists.value);
  const cards = useAppSelector((state) => state.cards.value);
  const showBoard = useAppSelector((state) => state.boardOptions.value);
  const currentSelectedCard = useAppSelector((state) => state.currentSelectedCard.value);
  const currentSelectedList = useAppSelector((state) => state.currentSelectedList.value);

  useEffect(() => {
    if (!board.id) {
      dispatch(setNewBoardState());
    }

    document.getElementById("lists-wrapper").scrollLeft = 0;
  }, []);

  const handleDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId, type } = result;
    const newListsOrder = [...lists];

    if (!destination) return;

    if (type === "list") {
      const listToMove = newListsOrder.find((list) => list.id === draggableId);

      newListsOrder.splice(source.index, 1);
      newListsOrder.splice(destination.index, 0, listToMove);

      dispatch(updateAllLists(newListsOrder));
    } else {
      const draggingCard = cards.find((card: Card) => card.id === draggableId);

      // within the same list
      if (source.droppableId === destination.droppableId) {
        const listCards = cards.filter((card: Card) => card.listId == destination.droppableId);
        const otherCards = cards.filter((card: Card) => card.listId !== destination.droppableId);

        listCards.splice(source.index, 1);
        listCards.splice(destination.index, 0, draggingCard);

        const newCardsOrder = listCards.concat(otherCards);
        dispatch(updateAllCards(newCardsOrder));
      } else {
        // dragging to different lists
        const copyOfDraggingCard = { ...draggingCard };
        copyOfDraggingCard.listId = destination.droppableId;

        const sourceListCards = cards.filter((card: Card) => card.listId === source.droppableId && card.id !== draggingCard.id);
        const destListCards = cards.filter((card: Card) => card.listId === destination.droppableId);
        const otherCards = cards.filter((card: Card) => card.listId !== source.droppableId && card.listId !== destination.droppableId);

        destListCards.splice(destination.index, 0, copyOfDraggingCard);

        const newCardsOrder = sourceListCards.concat(destListCards).concat(otherCards);
        dispatch(updateAllCards(newCardsOrder));
      }
    }
  };

  const addMargin = showBoard ? " mr-1/5" : "";

  return (
    <div className={"flex flex-col h-screen box-border w-screen" + addMargin}>
      <NavBar />
      {showBoard && <BoardOptionsMenu />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div
              id="lists-wrapper"
              className="flex px-6 pt-3 lists-wrapper overflow-x-auto"
              ref={provided.innerRef}
              {...[provided.droppableProps]}
            >
              {lists.map((list, index) => (
                <List key={list.id} list={list} index={index} />
              ))} 
              <AddList />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {currentSelectedCard && <CardModal card={currentSelectedCard} />}
      {currentSelectedList && <ListOptionsMenu list={currentSelectedList} />}
    </div>
  );
};

export default App;
