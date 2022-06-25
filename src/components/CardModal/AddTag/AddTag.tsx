import { FiPlus } from "react-icons/fi";
import { useAppDispatch } from "../../../app/hooks";
import { showTagsMenu } from "../../../features/modalActionMenusVisibilitySlice";

const AddTag = () => {
  const dispatch = useAppDispatch();

  const handleShowTagsMenu = () => {
    dispatch(showTagsMenu());
  };

  return (
    <button
      className="p-1 rounded-ibsm flex items-center cursor-pointer bg-black bg-opacity-5 hover:bg-opacity-10"
      onClick={handleShowTagsMenu}
    >
      <FiPlus className="mr-0.5 text-trello-gray-200" size={25} />
    </button>
  );
};

export default AddTag;
