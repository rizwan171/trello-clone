import { Draggable } from "react-beautiful-dnd";
import { setCurrentSelectedCard } from "../../../features/currentSelectedCardSlice";
import ListCardTag from "./ListCardTag/ListCardTag";
import { NO_COLOUR } from "../../../constants/TagColours";
import { ListCardProps } from "../../../types/components/ListCardProps";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ListCardIcons from "./ListCardIcons/ListCardIcons";

const ListCard = ({ card, index }: ListCardProps) => {
  const dispatch = useAppDispatch();
  const tagsToShow = useAppSelector((state) => state.tags.value).filter(
    (tag) => card.tags.includes(tag.id) && tag.colour !== NO_COLOUR
  );
  const showIcons = card.attachments.length > 0 || card.description.length > 0;

  const openModal = () => {
    dispatch(setCurrentSelectedCard(card));
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div data-testid="list-card-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={openModal}>
          <div className="flex flex-col shadow bg-white hover:bg-trello-gray-400 cursor-pointer rounded-md p-2 my-1.5 break-words">
            <p>{card.title}</p>
            {card.tags.length > 0 && (
              <div className="pt-2 text-xs flex flex-wrap gap-1">
                {tagsToShow.map((tag) => (
                  <ListCardTag key={tag.id} tag={tag} />
                ))}
              </div>
            )}
            {showIcons && <ListCardIcons card={card} />}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ListCard;
