import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateCardContent, deleteCard, copyCardToList, moveCardToList } from "../../features/cardsSlice";
import { clearSelectedCard, setCurrentSelectedCard } from "../../features/currentSelectedCardSlice";
import { useSelector } from "react-redux";

const CardModal = ({ card }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const lists = useSelector((state) => state.lists.value);
  const [selected, setSelected] = useState(false);
  // TODO: copy and move shouldnt be open at the same time, so these states could be reduced to just the 1
  const [copyOpen, setCopyOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState("");
  const [editableContent, setEditableContent] = useState(card.content);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [editableContent]);

  const closeModal = () => {
    dispatch(clearSelectedCard());
  };

  const handleCardContentOnChange = (e) => {
    setEditableContent(e.target.value);
  };

  const handleCopyCardOnChange = (e) => {
    setSelectedListId(e.target.value);
  };

  const handleMoveCardOnChange = (e) => {
    setSelectedListId(e.target.value);
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableContent(card.content);
    setRows(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelected(false);
      setRows(1);
      dispatch(updateCardContent({ id: card.id, content: editableContent }));
      dispatch(setCurrentSelectedCard({ ...card, content: editableContent }));
    }
  };

  const handleCopy = () => {
    if (copyOpen) {
      dispatch(copyCardToList({ cardId: card.id, listId: selectedListId }));
      setSelectedListId("");
      setCopyOpen(false);
    } else {
      setCopyOpen(true);
      setMoveOpen(false);
      setSelectedListId("");
    }
  };

  const handleMove = () => {
    if (moveOpen) {
      dispatch(moveCardToList({ cardId: card.id, listId: selectedListId }));
      setSelectedListId("");
      setMoveOpen(false);
    } else {
      setMoveOpen(true);
      setCopyOpen(false);
      setSelectedListId("");
    }
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(card.id));
    dispatch(clearSelectedCard());
  };

  const handleOnFocus = (e) => {
    // The scrollHeight is the height of all the content, including that which exceeds 1 row of textarea.
    // clientHeight is the height of the content the user can see at this point with 1 row of textarea.
    // To dynamically set the rows, we simply divide the scrollHeight by clientHeight and roundup
    setRows(Math.ceil(e.target.scrollHeight / e.target.clientHeight));
  };

  const openTagsMenu = () => {
    setTagsOpen(true);
  };

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="relative px-4 w-full max-w-3xl h-full md:h-auto mb-36">
        <div className="relative bg-trello-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-6 rounded-t">
            {!selected && (
              <h3
                className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white break-all"
                onClick={() => setSelected(true)}
              >
                {card.content}
              </h3>
            )}
            {selected && (
              <textarea
                ref={ref}
                type="text"
                value={editableContent}
                id="rounded-email"
                autoFocus
                rows={rows}
                onFocus={handleOnFocus}
                className="w-full scroll-y-hidden mr-2 py-1 text-trello-gray-300 text-xl font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
                onBlur={handleOnBlur}
                onChange={handleCardContentOnChange}
                onKeyDown={handleKeyDown}
              />
            )}

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-black hover:bg-opacity-10 hover:text-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="flex w-1/4 flex-col">
                <h4 className="mb-2 text-gray-500 text-xs self-end">Card Options</h4>
                {tagsOpen ? (
                  <div className="flex flex-col h-48">
                    <div>Test</div>
                    <div>Test</div>
                  </div>
                ) : (
                  <button
                    className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                    onClick={openTagsMenu}
                  >
                    Tags
                  </button>
                )}

                {/* TODO remove cursor-not-allowed and opacity-50 after colour added to card */}
                <button className="cursor-not-allowed opacity-50 flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                  Colour
                </button>
                {moveOpen && (
                  <select
                    value={selectedListId}
                    autoFocus
                    onChange={handleMoveCardOnChange}
                    className="form-select py-2 px-3 mb-2 flex w-full text-base font-normal text-gray-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option selected value="" disabled>
                      Select List...
                    </option>
                    {lists.map((list) => {
                      return (
                        <option key={list.id} value={list.id}>
                          {list.title}
                        </option>
                      );
                    })}
                  </select>
                )}
                <button
                  className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                  onClick={handleMove}
                >
                  {moveOpen ? "Confirm" : "Move"}
                </button>
                {copyOpen && (
                  <select
                    value={selectedListId}
                    autoFocus
                    onChange={handleCopyCardOnChange}
                    className="form-select py-2 px-3 mb-2 flex w-full text-base font-normal text-gray-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option selected value="" disabled>
                      Select List...
                    </option>
                    {lists.map((list) => {
                      return (
                        <option key={list.id} value={list.id}>
                          {list.title}
                        </option>
                      );
                    })}
                  </select>
                )}
                <button
                  className="flex w-full py-2 px-3 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                  onClick={handleCopy}
                >
                  {copyOpen ? "Confirm" : "Copy"}
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
