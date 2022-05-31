import React, { useEffect, useRef } from "react";

const CardModalTag = ({ tag }) => {
  const tagRef = useRef();

  useEffect(() => {
    tagRef.current.style.background = tag.colour;
  }, []);

  return (
    <div ref={tagRef} className="flex items-center gap-1 py-1 px-2 rounded-sm font-semibold text-white">
      <p>{tag.name}</p>
    </div>
  );
};

export default CardModalTag;