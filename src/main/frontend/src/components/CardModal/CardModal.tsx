import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { updateCardDescription, updateCardTitle } from "../../features/cardsSlice";
import { clearSelectedCard, setCurrentSelectedCard } from "../../features/currentSelectedCardSlice";
import { MdInbox, MdClose } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import CardModalActions from "./CardModalActions/CardModalActions";
import CardModalTags from "./CardModalTags/CardModalTags";
import CardModalAttachment from "./CardModalAttachments/CardModalAttachment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeAllModalMenus } from "../../features/modalActionMenusVisibilitySlice";

const CardModal = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const lists = useAppSelector((state) => state.lists.value);
  const editableTitleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [listName, setListName] = useState("");
  const [selected, setSelected] = useState(false);
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDescription, setEditableDescription] = useState("");
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (lists && card) {
      setEditableTitle(card.title);
      setEditableDescription(card.description);
      const cardList = lists.find((list) => list.id === card.listId);
      setListName(cardList ? cardList.title : "");
    }

    document.addEventListener("keydown", close);
  }, []);

  useEffect(() => {
    if (editableTitleRef && editableTitleRef.current) {
      editableTitleRef.current.style.height = "0px";
      const scrollHeight = editableTitleRef.current.scrollHeight;
      editableTitleRef.current.style.height = scrollHeight + "px";
    }
  }, [editableTitle]);

  // React.KeyboardEvent is not valid for document event handers, which must use globalThis
  const close = (e: globalThis.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", close);
    }
  };

  const closeModal = () => {
    dispatch(clearSelectedCard());
    dispatch(closeAllModalMenus());
  };

  const handleCardTitleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableDescription(e.target.value);
  };

  const handleUpdateDescription = () => {
    if (!card || !editableDescription) return;

    dispatch(updateCardDescription({ cardId: card.id, description: editableDescription }));
    dispatch(setCurrentSelectedCard({ ...card, description: editableDescription }));
  };

  const handleDescriptionKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      descriptionRef.current?.blur();
    }
  };

  const handleOnBlur = () => {
    setSelected(false);
    setEditableTitle(card ? card.title : "");
    setRows(1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setSelected(false);
      setRows(1);

      if (!card || !editableTitle) return;

      dispatch(updateCardTitle({ cardId: card.id, title: editableTitle }));
      dispatch(setCurrentSelectedCard({ ...card, title: editableTitle }));
    }
  };

  const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
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
      <div className="flex flex-col bg-trello-gray-400 w-218 rounded-sm max-h-full p-4 mb-80">
        <div className="flex">
          <div className="flex flex-col w-full">
            {!selected && (
              <div className="flex gap-1 items-center">
                <MdInbox size={25} />
                <h3 className="text-xl font-semibold text-gray-800 break-all" onClick={() => setSelected(true)}>
                  {card?.title}
                </h3>
              </div>
            )}
            {selected && (
              <textarea
                ref={editableTitleRef}
                typeof="text"
                value={editableTitle}
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
            <MdClose size={20} data-testid="card-modal-close-icon" />
          </button>
        </div>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-2/3 py-4">
            <CardModalTags />
            <div className="flex items-center gap-2 text-lg mb-2 text-gray-800 font-semibold">
              <FiAlignLeft size={20} />
              <p>Description</p>
            </div>
            {card && (
              <textarea
                ref={descriptionRef}
                value={editableDescription}
                onChange={handleDescriptionChange}
                onBlur={handleUpdateDescription}
                onKeyDown={handleDescriptionKeyDown}
                placeholder="Add some more detail here..."
                className="text-gray-600 p-2 bg-black bg-opacity-5 rounded-ibsm h-44"
              />
            )}
            <CardModalAttachment />
          </div>
          <CardModalActions />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
