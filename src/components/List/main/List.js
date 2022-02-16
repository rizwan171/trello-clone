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
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps}>
            <div className="shadow bg-trello-gray-100 rounded-md w-80 m-1 px-2 py-4 h-full">
              <ListTitle list={list} />
              <div>
                <Droppable droppableId={list.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {cards.map((card, index) => (
                        <ListCard key={card.id} card={card} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <AddCard listId={list.id} />
            </div>
          </div>
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
