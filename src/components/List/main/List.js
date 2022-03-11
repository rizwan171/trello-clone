import React, { useState } from "react";
import PropTypes from "prop-types";
import ListTitle from "../ListTitle/ListTitle.js";
import ListCard from "../ListCard/ListCard.js";
import AddCard from "../AddCard/AddCard.js";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { FiPlus, FiX } from "react-icons/fi";

const List = ({ list, index }) => {
  const cards = useSelector((state) => state.cards.value.filter((card) => card.listId === list.id));
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    // setText("");
  };

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
                <div ref={provided.innerRef} {...provided.droppableProps} className="scroll-y-hidden overflow-x-hidden">
                  {cards.map((card, index) => (
                    <ListCard key={card.id} card={card} index={index} />
                  ))}
                  {open && (
                    <>
                      <textarea
                        // ref={inputRef}
                        // value={text}
                        placeholder="Type something..."
                        autoFocus
                        className="w-full box-border outline-none border-2 border-trello-blue-100 shadow bg-white hover:bg-trello-gray-400 rounded-md p-2 my-1.5"
                        onBlur={() => setOpen(false)}
                        // onChange={handleOnChange}
                        // onKeyPress={handleKeyPress}
                      />
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="py-2 px-3 bg-trello-green-100 hover:bg-trello-green-200 text-white transition ease-in duration-200 text-center text-base shadow-md rounded-md"
                          // onClick={handleAddCard}
                        >
                          Add Card
                        </button>
                        <FiX
                          onClick={handleClose}
                          size={36}
                          className="text-trello-gray-200 hover:bg-trello-gray-500 cursor-pointer rounded-full ml-1 p-1"
                        />
                      </div>
                    </>
                  )}

                  {provided.placeholder}
                </div>
                {!open && (
                  <div
                    className="flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1"
                    onClick={() => setOpen(true)}
                  >
                    <FiPlus size={20} />
                    <h2 className="flex-1 ml-1.5">Add a card</h2>
                  </div>
                )}
              </>
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
