import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateCardContent, deleteCard, copyCardToList, moveCardToList } from "../../features/cardsSlice";
import { clearSelectedCard, setCurrentSelectedCard } from "../../features/currentSelectedCardSlice";
import { useSelector } from "react-redux";
import { AiOutlineTag, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineContentCopy, MdInbox, MdClose, MdOutlineEdit, MdCheck } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import Tag from "./Tag/Tag";
import AddTag from "./AddTag/AddTag";

const CardModal = ({ card }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const tagsButtonRef = useRef();
  const lists = useSelector((state) => state.lists.value);
  const tags = useSelector((state) => state.tags.value);
  const [selected, setSelected] = useState(false);
  // TODO: copy and move shouldnt be open at the same time, so these states could be reduced to just the 1
  const [copyOpen, setCopyOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState("");
  const [editableContent, setEditableContent] = useState(card.content);
  const [rows, setRows] = useState(1);
  const [tagsMenuStyle, setTagsMenuStyle] = useState({});

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [editableContent]);

  useEffect(() => {}, []);

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

  return (
    <div
      id="cardModal"
      className="z-50 min-h-full min-w-full flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-30"
    >
      <div className="flex flex-col bg-trello-gray-400 w-218 rounded-sm h-96 p-4 mb-80">
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
            <p className="text-sm text-gray-700">in list LIST_NAME_HERE</p>
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
            <div>
              <div className="flex flex-col text-sm text-gray-700">
                <p className="mb-2">Labels</p>
                <div className="flex gap-1 flex-wrap mb-4">
                  {tags.map((tag) => (
                    <Tag key={tag.id} name={tag.name} />
                  ))}
                  <AddTag />
                </div>
              </div>
            </div>
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
          <div className="flex flex-col w-44 py-4 ml-auto bg-red-500">
            <h4 className="text-gray-800 text-sm">Add to card</h4>
            <button
              ref={tagsButtonRef}
              className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
            >
              <AiOutlineTag />
              <p>Tags</p>
            </button>
            {/* TODO min-h-60 should be changed later to something more appropriate */}
            <div className="fixed w-72 min-h-60 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4 ">
              <div className="relative text-center mb-2">
                <span className="text-sm block relative z-10">Tags</span>
                <MdClose size={20} className="absolute right-0 top-0 z-20" />
              </div>
              <hr />
              <div className="flex flex-col mt-2 text-sm">
                <input
                  type="text"
                  className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
                  placeholder="Search tags..."
                />
                <span className="text-gray-600 my-2 font-semibold">Tags</span>
                <div className="flex flex-col w-full gap-1 font-bold">
                  <div className="flex h-8">
                    <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
                      <span className="ml-2">Tag Name</span>
                      <MdCheck size={20} className="ml-auto mr-2" />
                    </div>
                    <MdOutlineEdit className="self-center ml-2" size={20} />
                  </div>
                  <div className="flex h-8">
                    <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
                      <span className="ml-2">Tag Name</span>
                      <MdCheck size={20} className="ml-auto mr-2" />
                    </div>
                    <MdOutlineEdit className="self-center ml-2" size={20} />
                  </div>
                  <div className="flex h-8">
                    <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
                      <span className="ml-2">Tag Name</span>
                    </div>
                    <MdOutlineEdit className="self-center ml-2" size={20} />
                  </div>
                  <div className="flex h-8">
                    <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
                      <span className="ml-2">Tag Name</span>
                      <MdCheck size={20} className="ml-auto mr-2" />
                    </div>
                    <MdOutlineEdit className="self-center ml-2" size={20} />
                  </div>
                  <div className="flex h-8">
                    <div className="items-center flex bg-green-400 text-white w-full rounded-ibsm">
                      <span className="ml-2">Tag Name</span>
                    </div>
                    <MdOutlineEdit className="self-center ml-2" size={20} />
                  </div>
                </div>
                <button className="py-1.5 px-2 mt-3 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-sm shadow-sm rounded-sm">
                  Create a new tag
                </button>
              </div>
            </div>
            <h4 className="text-gray-800 text-sm">Actions</h4>
            <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
              <MdOutlineContentCopy />
              <p>Copy</p>
            </button>
            <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
              <HiOutlineArrowRight />
              <p>Move</p>
            </button>
            <button className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm">
              <AiOutlineDelete />
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
      {/* OLD */}
      {/* <div className="relative px-4 w-full max-w-3xl h-full md:h-auto mb-36">
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
          <div className="flex gap-1 px-6 flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag.id} name={tag.name} />
            ))}
            <AddTag />
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
      </div> */}
    </div>
  );
};

export default CardModal;
