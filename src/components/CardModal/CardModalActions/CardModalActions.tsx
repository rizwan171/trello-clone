import { AiOutlineTag, AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import {
  showCopyMenu,
  showDeleteMenu,
  showMoveMenu,
  showTagsMenu,
  showAttachmentMenu,
} from "../../../features/modalActionMenusVisibilitySlice";
import CreateTagMenu from "./TagsMenu/CreateTagMenu/CreateTagMenu";
import TagsMenu from "./TagsMenu/TagsMenu";
import CopyMenu from "./CopyMenu/CopyMenu";
import MoveMenu from "./MoveMenu/MoveMenu";
import DeleteMenu from "./DeleteMenu/DeleteMenu";
import AttachmentMenu from "./AttachmentMenu/AttachmentMenu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const CardModalActions = () => {
  const dispatch = useAppDispatch();
  const tagsMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.tagsMenuOpen);
  const createTagsMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.createTagsMenuOpen);
  const copyMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.copyMenuOpen);
  const moveMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.moveMenuOpen);
  const deleteMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.deleteMenuOpen);
  const attachmentMenuOpen = useAppSelector((state) => state.modalActionMenusVisibility.value.attachmentMenuOpen);

  const handleShowTagsMenu = () => {
    dispatch(showTagsMenu());
  };

  const handleShowCopyMenu = () => {
    dispatch(showCopyMenu());
  };

  const handleShowMoveMenu = () => {
    dispatch(showMoveMenu());
  };

  const handleShowDeleteMenu = () => {
    dispatch(showDeleteMenu());
  };

  const handleShowAttachmentMenu = (id: number) => {
    dispatch(showAttachmentMenu(id));
  };

  return (
    <div className="flex flex-col w-44 py-4 ml-auto">
      <h4 className="text-gray-800 text-sm">Add to card</h4>
      <div className="flex-col flex">
        <button
          className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
          onClick={handleShowTagsMenu}
        >
          <AiOutlineTag />
          <p>Tags</p>
        </button>
        {tagsMenuOpen && <TagsMenu />}
      </div>
      {createTagsMenuOpen && <CreateTagMenu />}
      <h4 className="text-gray-800 text-sm">Actions</h4>
      <div className="flex-col flex">
        <button
          className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
          onClick={handleShowCopyMenu}
        >
          <MdOutlineContentCopy />
          <p>Copy</p>
        </button>
        {copyMenuOpen && <CopyMenu />}
      </div>

      <div className="flex-col flex">
        <button
          className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
          onClick={handleShowMoveMenu}
        >
          <HiOutlineArrowRight />
          <p>Move</p>
        </button>
        {moveMenuOpen && <MoveMenu />}
      </div>

      <div className="flex-col flex">
        <button
          className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
          onClick={handleShowDeleteMenu}
        >
          <AiOutlineDelete />
          <p>Delete</p>
        </button>
        {deleteMenuOpen && <DeleteMenu />}
      </div>

      <div className="flex-col flex">
        <button
          className="flex gap-2 py-1 px-2 mb-2 bg-trello-gray-card-modal-buttons hover:bg-trello-gray-card-modal-buttons-hover text-trello-blue-card-modal-button-text items-center text-base shadow-sm rounded-sm"
          onClick={() => handleShowAttachmentMenu(1)}
        >
          <AiOutlinePaperClip />
          <p>Attachment</p>
        </button>
        {attachmentMenuOpen.status && attachmentMenuOpen.id === 1 && <AttachmentMenu update={false} />}
      </div>
    </div>
  );
};

export default CardModalActions;
