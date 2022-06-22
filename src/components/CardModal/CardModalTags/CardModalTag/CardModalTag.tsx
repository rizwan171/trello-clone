import { useEffect, useRef } from "react";
import { CardModalTagProps } from "../../../../types/components/CardModalTagProps";

const CardModalTag = ({ tag }: CardModalTagProps) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.style.background = tag.colour;
    }
  }, []);

  return (
    <div ref={tagRef} className="flex items-center gap-1 py-1 px-2 rounded-sm font-semibold text-white">
      <p>{tag.name}</p>
    </div>
  );
};

export default CardModalTag;
