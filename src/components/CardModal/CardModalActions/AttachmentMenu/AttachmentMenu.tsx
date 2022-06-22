import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import localforage from "localforage";
import { ChangeEvent, useRef } from "react";
import { MdClose } from "react-icons/md";
import { closeMenu } from "../../../../features/modalActionMenusVisibilitySlice";
import { v4 as uuidv4 } from "uuid";
import { addFilesToCard } from "../../../../features/cardsSlice";
import { setCurrentSelectedCard } from "../../../../features/currentSelectedCardSlice";
import { AttachmentMenuProps } from "../../../../types/components/AttachmentMenuProps";

const AttachmentMenu = ({ update }: AttachmentMenuProps): JSX.Element => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.currentSelectedCard.value);

  let style = "fixed mt-10 w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4";
  if (update) style = "fixed w-72 text-gray-700 bg-white rounded-ibsm shadow-2xl p-4";

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!card) {
      return;
    }

    const files = e.target.files;
    const upload = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const id = uuidv4();
        const date = JSON.stringify(new Date());
        await localforage.setItem(id, files[i]);
        upload.push({ id, date, name: files[i].name });
      }
    }

    dispatch(addFilesToCard({ cardId: card.id, uploadedFiles: [...upload] }));
    dispatch(setCurrentSelectedCard({ ...card, attachments: [...card.attachments, ...upload] }));
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    <div className={style}>
      <div className="relative text-center mb-2">
        <span className="text-sm block relative z-10">Attach From... </span>
        <MdClose onClick={handleClose} size={20} className="absolute right-0 top-0 z-20 cursor-pointer" />
      </div>
      <hr />
      <div className="flex flex-col mt-2 text-sm">
        <button
          onClick={() => hiddenFileInput.current?.click()}
          className="p-2 mt-3 bg-trello-blue-100 hover:bg-trello-blue-200 text-white font-semibold items-center text-sm shadow-sm rounded-sm"
        >
          Upload from computer
        </button>
        <input multiple className="hidden" type="file" name="file" onChange={handleFileSelect} ref={hiddenFileInput} />
      </div>
    </div>
  );
};

export default AttachmentMenu;
