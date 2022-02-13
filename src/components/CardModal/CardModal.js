import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../features/cardsSlice";
import { clearSelectedCard } from "../../features/currentSelectedCardSlice";

const CardModal = ({ card }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(card.content);
  const [width, setWidth] = useState(20);

  const closeModal = () => {
    dispatch(clearSelectedCard());
  };

  const handleOnChange = (e) => {
    setEditableTitle(e.target.value);

    const inputLength = e.target.value.length;
    if (inputLength >= 20 && inputLength < 40) {
      setWidth(e.target.value.length);
    }
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(card.content);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelected(false);
      setEditableTitle(card.content); // TODO update card content here
      // updateListTitle(editableTitle, listId);
    }
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(card.id));
    dispatch(clearSelectedCard());
  };

  const handleOnFocus = (e) => {
    const inputLength = e.target.value.length;
    if (inputLength >= 20 && inputLength < 40) {
      setWidth(e.target.value.length);
    }
  };

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="relative px-4 w-full max-w-3xl h-full md:h-auto mb-36">
        <div className="relative bg-trello-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-6 rounded-t">
            {!selected && (
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white" onClick={() => setSelected(true)}>
                {card.content}
              </h3>
            )}
            {selected && (
              <input
                type="text"
                value={editableTitle}
                id="rounded-email"
                autoFocus
                size={width}
                onFocus={handleOnFocus}
                className="ml-2 py-1 text-trello-gray-300 text-xl font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
              />
            )}

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex">
              <div className="w-3/4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                  companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                  ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
                  possible of high-risk data breaches that could personally affect them.
                </p>
              </div>
              <div className="flex items-end w-1/4 flex-col">
                <h4 className="mb-2 text-gray-500 text-xs">Card Options</h4>
                <button className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                  Tags
                </button>
                <button className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                  Colour
                </button>
                <button className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                  Move
                </button>
                <button className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                  Copy
                </button>
                <button
                  className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                  onClick={handleDeleteCard}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
