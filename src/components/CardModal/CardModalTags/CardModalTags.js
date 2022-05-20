import React from "react";
import { useSelector } from "react-redux";
import AddTag from "../AddTag/AddTag";
import CardModalTag from "./CardModalTag/CardModalTag";

const CardModalTags = () => {
  const tags = useSelector((state) => state.tags.value);

  return (
    <div className="flex flex-col text-sm text-gray-700">
      <p className="mb-2">Tags</p>
      <div className="flex gap-1 flex-wrap mb-4">
        {tags.map((tag) => (
          <CardModalTag key={tag.id} tag={tag} />
        ))}
        <AddTag />
      </div>
    </div>
  );
};

export default CardModalTags;
