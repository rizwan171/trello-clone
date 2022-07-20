import { ChangeEvent, useRef, useState } from "react";
import {
  AiOutlinePicture,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineDownload,
  AiOutlineUpload,
} from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import ColourOptions from "./ColourOptions/ColourOptions";
import ImageSearchOptions from "./ImageSearchOptions/ImageSearchOptions";
import ImageUploadOptions from "./ImageUploadOptions/ImageUploadOptions";
import * as Constants from "../../constants/TabIdentifiers";
import { setNewBoardState, updateTitle } from "../../features/boardSlice";
import { deleteAllLists, updateAllLists } from "../../features/listsSlice";
import { deleteAllCards, updateAllCards } from "../../features/cardsSlice";
import ExportModal from "./ExportModal/ExportModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TabIdentifier } from "../../types/global/TabIdentifier";
import { ExportDataFull, ExportDataList } from "../../types/global/ExportData";
import ImportData from "../../types/global/ImportData";
import { updateAllTags } from "../../features/tagsSlice";

const BoardOptionsMenu = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.value);
  const lists = useAppSelector((state) => state.lists.value);
  const cards = useAppSelector((state) => state.cards.value);
  const tags = useAppSelector((state) => state.tags.value);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const coloursRef = useRef<HTMLButtonElement>(null);
  const imageSearchRef = useRef<HTMLButtonElement>(null);
  const imageUploadRef = useRef<HTMLButtonElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [coloursTabActive, setColoursTabActive] = useState(true);
  const [imageSearchTabActive, setImageSearchTabActive] = useState(false);
  const [imageUploadTabActive, setImageUploadTabActive] = useState(false);

  const handleTabChange = (tabIdentifier: TabIdentifier) => {
    removeSelectedClass();
    resetActiveTab();

    const coloursTab = coloursRef.current;
    const imageSearchTab = imageSearchRef.current;
    const imageUploadTab = imageUploadRef.current;
    if (!coloursTab || !imageSearchTab || !imageUploadTab) return;

    switch (tabIdentifier) {
      case Constants.COLOURS_TAB_IDENTIFIER:
        coloursTab.className = coloursTab.className += " selected-tab";
        setColoursTabActive(true);
        break;
      case Constants.IMAGE_SEARCH_TAB_IDENTIFIER:
        imageSearchTab.className = imageSearchTab.className += " selected-tab";
        setImageSearchTabActive(true);
        break;
      case Constants.IMAGE_UPLOAD_TAB_IDENTIFIER:
        imageUploadTab.className = imageUploadTab.className += " selected-tab";
        setImageUploadTabActive(true);
        break;
      default:
        return;
    }
  };

  const removeSelectedClass = () => {
    const coloursTab = coloursRef.current;
    const imageSearchTab = imageSearchRef.current;
    const imageUploadTab = imageUploadRef.current;
    if (!coloursTab || !imageSearchTab || !imageUploadTab) return;

    coloursTab.className = coloursTab.className.replace("selected-tab", "");
    imageSearchTab.className = imageSearchTab.className.replace("selected-tab", "");
    imageUploadTab.className = imageUploadTab.className.replace("selected-tab", "");
  };

  const resetActiveTab = () => {
    setColoursTabActive(false);
    setImageSearchTabActive(false);
    setImageUploadTabActive(false);
  };

  // TODO this could set a title variable based on what was selected so ExportModal could be reused for import
  const openExportModal = () => {
    setExportModalOpen(true);
  };

  const closeExportModal = () => {
    setExportModalOpen(false);
  };

  const initiateDownload = (data: ExportDataFull | ExportDataList) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
    link.remove();
  };

  const handleImportAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      let result: ImportData;
      const fr = new FileReader();
      fr.onload = () => {
        const uploadedFileJson = fr.result as string;
        if (uploadedFileJson) {
          result = JSON.parse(uploadedFileJson);
          dispatch(deleteAllLists());
          dispatch(deleteAllCards());
          // TODO update board id here
          dispatch(updateTitle(result.board.title));
          dispatch(updateAllLists(result.lists));
          dispatch(updateAllCards(result.cards));
          dispatch(updateAllTags(result.tags));
          // TODO add import for attachments
        }
      };

      fr.readAsText(file);
    }
  };

  const handleImportAllClick = () => {
    fileInput.current?.click();
  };

  const handleExportAll = () => {
    // TODO update with board info as well when that has been implemented
    const data = {
      board,
      lists: [...lists],
      cards: [...cards],
      tags: [...tags],
    };

    initiateDownload(data);
  };

  const handleExportList = (listId: string) => {
    if (listId.length > 0) {
      const list = lists.find((list) => list.id === listId);
      if (list) {
        const data = {
          list,
          cards: cards.filter((card) => card.listId === listId),
          tags: [...tags],
        };

        initiateDownload(data);
      }
      closeExportModal();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteAllLists());
    dispatch(deleteAllCards());
    dispatch(setNewBoardState());

    closeDeleteModal();
  };

  return (
    // TODO remove text-white
    <>
      <div className="h-full w-1/5 fixed z-10 top-0 right-0 bg-trello-gray-300 text-white">
        <div className="px-8 py-4">
          <p className="text-2xl">Board Options</p>
        </div>
        <div className="px-8 text-xl h-full">
          <div className="mb-4">
            <div className="flex mb-2">
              <AiOutlinePicture size={25} className="mr-3 mt-auto" />
              <p>Background</p>
            </div>
            <hr />
            <div className="flex">
              <button
                ref={coloursRef}
                className="py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base selected-tab"
                onClick={() => handleTabChange(Constants.COLOURS_TAB_IDENTIFIER)}
              >
                Colour
              </button>
              <button
                ref={imageSearchRef}
                className="py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base"
                onClick={() => handleTabChange(Constants.IMAGE_SEARCH_TAB_IDENTIFIER)}
              >
                Image Search
              </button>
              <button
                ref={imageUploadRef}
                className="py-2 px-3 mt-2 mb-2 bg-transparent outline-none border-transparent border-b-4 rounded-sm hover:border-trello-blue-100 hover:border-current text-white items-center text-base"
                onClick={() => handleTabChange(Constants.IMAGE_UPLOAD_TAB_IDENTIFIER)}
              >
                Image Upload
              </button>
            </div>
            <div className="h-52 max-h-96 w-full bg-trello-gray-500 rounded-md text-black p-1 scroll-y-hidden">
              {coloursTabActive && <ColourOptions />}
              {imageSearchTabActive && <ImageSearchOptions />}
              {imageUploadTabActive && <ImageUploadOptions />}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <AiOutlineCloudUpload size={25} className="mr-3 mb-1" />
              <p className="mb-2">Import</p>
            </div>
            <hr />
            <div className="flex flex-col">
              <input type="file" id="file" data-testid="file" ref={fileInput} onChange={(e) => handleImportAll(e)} className="hidden" />
              <button
                className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                onClick={handleImportAllClick}
              >
                <AiOutlineUpload className="mr-2" size={20} />
                Import All
              </button>
              <button className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                <AiOutlineUpload className="mr-2" size={20} />
                Import Board
              </button>
              <button className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                <AiOutlineUpload className="mr-2" size={20} />
                Import List
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <AiOutlineCloudDownload size={25} className="mr-3 mb-1" />
              <p className="mb-2">Export</p>
            </div>
            <hr />
            <div className="flex flex-col">
              <button
                className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 items-center text-base shadow-md rounded-md"
                onClick={handleExportAll}
              >
                <AiOutlineDownload className="mr-2" size={20} />
                Export All
              </button>
              <button className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md">
                <AiOutlineDownload className="mr-2" size={20} />
                Export Board
              </button>
              <button
                className="flex py-2 px-3 mt-2 mb-2 bg-trello-green-100 hover:bg-trello-green-200 text-white items-center text-base shadow-md rounded-md"
                onClick={openExportModal}
              >
                <AiOutlineDownload className="mr-2" size={20} />
                Export List
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <RiDeleteBin2Line size={25} className="mr-3 mb-2" />
              <p className="mb-2">Delete</p>
            </div>
            <hr />
            <div className="flex flex-col">
              <button
                className="flex py-2 px-3 mt-2 mb-2 bg-red-600 hover:bg-red-800 text-white items-center text-base shadow-md rounded-md"
                onClick={openDeleteModal}
              >
                <MdOutlineDelete className="mr-2" size={20} />
                Delete Board
              </button>
            </div>
          </div>
        </div>
      </div>
      {exportModalOpen && <ExportModal closeExportModal={closeExportModal} handleExportList={handleExportList} />}
      {deleteModalOpen && <DeleteModal closeDeleteModal={closeDeleteModal} handleDeleteBoard={handleDeleteBoard} />}
    </>
  );
};

export default BoardOptionsMenu;
