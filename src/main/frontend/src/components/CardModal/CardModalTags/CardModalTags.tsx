import { useAppSelector } from "../../../app/hooks";
import AddTag from "../AddTag/AddTag";
import CardModalTag from "./CardModalTag/CardModalTag";

const CardModalTags = () => {
  const card = useAppSelector((state) => state.currentSelectedCard.value);
  const tagsToShow = useAppSelector((state) => state.tags.value).filter((tag) => card?.tags.includes(tag.id));

  return (
    <div className="flex flex-col text-sm text-gray-700">
      <p className="mb-2">Tags</p>
      <div className="flex gap-1 flex-wrap mb-4">
        {tagsToShow.map((tag) => (
          <CardModalTag key={tag.id} tag={tag} />
        ))}
        <AddTag />
      </div>
    </div>
  );
};

export default CardModalTags;
