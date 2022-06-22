import { BiCog } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleBoardVisibility } from "../../../features/boardOptionSlice";

const BoardOptions = () => {
  const dispatch = useAppDispatch();
  const boardOpen = useAppSelector((state) => state.boardOptions.value);

  const handleOnClick = () => {
    dispatch(toggleBoardVisibility());
  };

  return (
    <div className="my-auto">
      <button
        type="button"
        className="flex items-center px-3 py-2 text-lg text-trello-gray-200 bg-trello-gray-500 bg-opacity-50 bg-transparent hover:bg-opacity-100 text-center shadow-md rounded-md"
        onClick={handleOnClick}
      >
        <BiCog size={20} className="mr-2" />
        {boardOpen ? "Close" : "Options"}
      </button>
    </div>
  );
};

export default BoardOptions;
