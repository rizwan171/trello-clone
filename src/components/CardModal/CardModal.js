import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateCardContent, deleteCard, copyCardToList, moveCardToList } from "../../features/cardsSlice";
import { clearSelectedCard, setCurrentSelectedCard } from "../../features/currentSelectedCardSlice";
import { useSelector } from "react-redux";
import { MdInbox, MdClose } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import CardModalTag from "./CardModalTags/CardModalTag/CardModalTag";
import AddTag from "./AddTag/AddTag";
import CardModalActions from "./CardModalActions/CardModalActions";
import CardModalTags from "./CardModalTags/CardModalTags";

const CardModal = ({ card }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const listName = useSelector((state) => state.lists.value).find((list) => list.id === card.listId).title;
  const [selected, setSelected] = useState(false);
  // TODO: copy and move shouldnt be open at the same time, so these states could be reduced to just the 1
  const [copyOpen, setCopyOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
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

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="flex flex-col bg-trello-gray-400 w-218 rounded-sm  max-h-full p-4 mb-80">
        <div className="flex">
          <div className="flex flex-col w-full">
            {!selected && (
              <div className="flex gap-1 items-center">
                <MdInbox size={25} />
                <h3 className="text-xl font-semibold text-gray-800 break-all" onClick={() => setSelected(true)}>
                  {card.content}
                </h3>
              </div>
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
                className="w-full scroll-y-hidden mr-2 text-trello-gray-300 text-xl font-semibold rounded-sm border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
                onBlur={handleOnBlur}
                onChange={handleCardContentOnChange}
                onKeyDown={handleKeyDown}
              />
            )}
            <p className="text-sm text-gray-700">in list {listName}</p>
          </div>

          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-black hover:bg-opacity-10 hover:text-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-2/3 py-4">
            <CardModalTags card={card} />
            <div className="flex items-center gap-2 text-lg text-gray-800 font-semibold">
              <FiAlignLeft size={20} />
              <p>Description</p>
            </div>
            <p>
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies
              around the world are updating their terms of service agreements to comply. With less than a month to go before the
              European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their
              terms of service agreements to comply.
            </p>
          </div>
          <CardModalActions card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
