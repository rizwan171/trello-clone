import { useEffect, useState } from "react";
import ListTitle from "../ListTitle/ListTitle";
import ListCard from "../ListCard/ListCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddCardPrompt from "../AddCard/AddCardPrompt/AddCardPrompt";
import AddCardForm from "../AddCard/AddCardForm/AddCardForm";
import ListProps from "../../../types/components/ListProps";
import { useAppSelector } from "../../../app/hooks";

const List: React.FunctionComponent<ListProps> = ({ list, index }) => {
  const cards = useAppSelector((state) => state.cards.value.filter((card) => card.listId === list.id));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listElement = document.getElementById(list.id);
    if (listElement) {
      listElement.scrollTop = 0;
    }
  }, []);

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-2 flex flex-col list-wrapper"
        >
          <ListTitle list={list} />
          <Droppable droppableId={list.id}>
            {(provided) => (
              <>
                <div
                  id={list.id}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="overflow-y-auto overflow-x-hidden min-h-4 pb-1.5"
                >
                  {cards.map((card, index) => (
                    <ListCard key={card.id} card={card} index={index} />
                  ))}
                  <AddCardForm listId={list.id} open={open} setOpen={setOpen} />
                  {provided.placeholder}
                </div>
                <AddCardPrompt open={!open} setOpen={setOpen} />
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
