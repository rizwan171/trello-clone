import React, { useEffect, useRef } from "react";

const ListCardTag = ({ tag }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.style.background = tag.colour;
  }, []);

  return (
    <div ref={ref} className="rounded-ibsm p-1">
      {tag.name}
    </div>
  );
};

export default ListCardTag;
