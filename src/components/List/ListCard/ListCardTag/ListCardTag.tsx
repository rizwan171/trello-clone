import { useEffect, useRef } from "react";
import ListCardTagProps from "../../../../types/components/ListCardTagProps";

const ListCardTag: React.FunctionComponent<ListCardTagProps> = ({ tag }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.background = tag.colour;
    }
  }, []);

  return (
    <div ref={ref} className="rounded-ibsm p-1">
      {tag.name}
    </div>
  );
};

export default ListCardTag;
