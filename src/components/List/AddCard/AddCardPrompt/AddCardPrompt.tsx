import { FiPlus } from "react-icons/fi";
import { AddCardPromptProps } from "../../../../types/components/AddCardPromptProps";

const AddCardPrompt = ({ setOpen }: AddCardPromptProps) => {

  return (
    <div className="flex flex-col transition-height ease-in-out duration-100 h-min">
      <div
        data-testid="add-card-prompt-container"
        className="flex hover:bg-trello-gray-500 rounded-ibsm items-center cursor-pointer text-trello-gray-600 p-1 mt-1"
        onClick={() => setOpen(true)}
      >
        <FiPlus size={20} />
        <h2 className="flex-1 ml-1.5">Add a card</h2>
      </div>
    </div>
  );
};

export default AddCardPrompt;
