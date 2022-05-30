import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCardDescription, updateCardTitle } from "../../features/cardsSlice";
import { clearSelectedCard, setCurrentSelectedCard } from "../../features/currentSelectedCardSlice";
import { useSelector } from "react-redux";
import { MdInbox, MdClose } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import CardModalActions from "./CardModalActions/CardModalActions";
import CardModalTags from "./CardModalTags/CardModalTags";

const CardModal = ({ card }) => {
  const dispatch = useDispatch();
  const editableTitleRef = useRef();
  const descriptionRef = useRef();
  const listName = useSelector((state) => state.lists.value).find((list) => list.id === card.listId).title;
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState(card.title);
  const [editableDescription, setEditableDescription] = useState(card.description);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (editableTitleRef && editableTitleRef.current) {
      editableTitleRef.current.style.height = "0px";
      const scrollHeight = editableTitleRef.current.scrollHeight;
      editableTitleRef.current.style.height = scrollHeight + "px";
    }
  }, [editableTitle]);

  const closeModal = () => {
    dispatch(clearSelectedCard());
  };

  const handleCardTitleOnChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditableDescription(e.target.value);
  };

  const handleUpdateDescription = () => {
    dispatch(updateCardDescription({ id: card.id, description: editableDescription }));
    dispatch(setCurrentSelectedCard({ ...card, description: editableDescription }));
  };

  const handleDesciptionKeyDown = (e) => {
    if (e.code === "Escape") {
      descriptionRef.current.blur();
    }
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(card.title);
    setRows(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelected(false);
      setRows(1);
      dispatch(updateCardTitle({ id: card.id, title: editableTitle }));
      dispatch(setCurrentSelectedCard({ ...card, title: editableTitle }));
    }
  };

  const handleOnFocus = (e) => {
    // The scrollHeight is the height of all the content, including that which exceeds 1 row of textarea.
    // clientHeight is the height of the content the user can see at this point with 1 row of textarea.
    // To dynamically set the rows, we simply divide the scrollHeight by clientHeight and roundup
    setRows(Math.ceil(e.target.scrollHeight / e.target.clientHeight));
  };

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="flex flex-col bg-trello-gray-400 w-218 rounded-sm h-96 max-h-full p-4 mb-80">
        <div className="flex">
          <div className="flex flex-col w-full">
            {!selected && (
              <div className="flex gap-1 items-center">
                <MdInbox size={25} />
                <h3 className="text-xl font-semibold text-gray-800 break-all" onClick={() => setSelected(true)}>
                  {card.title}
                </h3>
              </div>
            )}
            {selected && (
              <textarea
                ref={editableTitleRef}
                type="text"
                value={editableTitle}
                id="rounded-email"
                autoFocus
                rows={rows}
                onFocus={handleOnFocus}
                className="w-full scroll-y-hidden mr-2 text-trello-gray-300 text-xl font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
                onBlur={handleOnBlur}
                onChange={handleCardTitleOnChange}
                onKeyDown={handleKeyDown}
              />
            )}
            <p className="text-sm text-gray-700">in list {listName}</p>
          </div>

          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-black hover:bg-opacity-10 hover:text-gray-600 rounded-lg text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-2/3 py-4">
            <CardModalTags card={card} />
            <div className="flex items-center gap-2 text-lg mb-2 text-gray-800 font-semibold">
              <FiAlignLeft size={20} />
              <p>Description</p>
            </div>
            {card.description.trim().length < 0 ? (
              <p>{card.description}</p>
            ) : (
              <textarea
                ref={descriptionRef}
                value={editableDescription}
                onChange={handleDescriptionChange}
                onBlur={handleUpdateDescription}
                onKeyDown={handleDesciptionKeyDown}
                placeholder="Add some more detail here..."
                className="text-gray-600 p-2 bg-black bg-opacity-5 rounded-ibsm h-44"
              />
            )}
          </div>
          <CardModalActions card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
