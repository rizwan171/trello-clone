import { useSelector } from "react-redux";
import AddTag from "../AddTag/AddTag";
import CardModalTag from "./CardModalTag/CardModalTag";

const CardModalTags = ({ card }) => {
  const tagsToShow = useSelector((state) => state.tags.value).filter((tag) => card.tags.includes(tag.id));

  return (
    <div className="flex flex-col text-sm text-gray-700">
      <p className="mb-2">Tags</p>
      <div className="flex gap-1 flex-wrap mb-4">
        {tagsToShow.map((tag) => (
          <CardModalTag key={tag.id} tag={tag} />
        ))}
        <AddTag card={card} />
      </div>
    </div>
  );
};

export default CardModalTags;
