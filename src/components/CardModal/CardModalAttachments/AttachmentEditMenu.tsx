import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateFileInCard } from "../../../features/cardsSlice";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import { closeMenu } from "../../../features/modalActionMenusVisibilitySlice";
import { AttachmentEditMenuProps } from "../../../types/components/AttachmentEditMenuProps";

const AttachmentEditMenu = ({ fileId, fileName }: AttachmentEditMenuProps) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const [editableFileName, setEditableFileName] = useState(fileName);

  const handleEdit = () => {
    if (!card) return;

    dispatch(updateFileInCard({ cardId: card.id, fileId, fileName: editableFileName }));
    const index = card.attachments.findIndex((item) => item.id === fileId);
    const attachments = card.attachments.map((item) => {
      if (item.id === fileId) {
        return { id: fileId, date: item.date, name: editableFileName };
      }
      return item;
    });
    if (index !== -1) {
      dispatch(setCurrentSelectedCard({ ...card, attachments: [...attachments] }));
    }

    handleClose();
  };

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    // TODO change mt-32 to something more robust
    <div className="fixed mt-16 w-80 ml-24 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4">
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Edit attachment?</span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <span className="font-medium pb-2">Link name</span>

        <input
          type="text"
          autoFocus
          onChange={(e) => setEditableFileName(e.target.value.trim())}
          value={editableFileName}
          className="w-full h-9 py-1 px-2 border-1 mb-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-trello-blue-100"
          placeholder="Change attachment name"
        />

        <button
          className="p-2 mt-2 w-32 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
          onClick={() => handleEdit()}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AttachmentEditMenu;
