import React from "react";
import PropTypes from "prop-types";
import ListTitle from "../ListTitle/ListTitle.js";
import ListCard from "../ListCard/ListCard.js";
import AddCard from "../AddCard/AddCard.js";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const List = ({ list, index }) => {
  const cards = useSelector((state) => state.cards.value.filter((card) => card.listId === list.id));

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
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="overflow-y-auto overflow-x-hidden"
              >
                {cards.map((card, index) => (
                  <ListCard key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
                <AddCard listId={list.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  list: PropTypes.object,
  index: PropTypes.number,
};

export default List;
