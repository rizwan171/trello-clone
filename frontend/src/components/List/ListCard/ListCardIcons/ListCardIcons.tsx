import { AiOutlinePaperClip } from "react-icons/ai";
import { GrTextAlignFull } from "react-icons/gr";
import { ListCardIconProps } from "../../../../types/components/ListCardIconProps";

const ListCardIcons = ({ card }: ListCardIconProps) => {
  return (
    <div className="flex items-center space-x-2 text-gray-600 pt-2">
      {card.description.length > 0 && <GrTextAlignFull />}
      {card.attachments.length > 0 && (
        <div className="flex justify-center">
          <AiOutlinePaperClip size={20} />
          <span className="text-sm">{card.attachments.length}</span>
        </div>
      )}
    </div>
  );
};

export default ListCardIcons;
