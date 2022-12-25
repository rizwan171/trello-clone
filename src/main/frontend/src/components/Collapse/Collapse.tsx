import { useRef } from "react";
import { CollapseProps } from "../../types/components/CollapseProps";

const Collapse = ({ isOpen, children, className }: CollapseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inlineStyle = isOpen ? { height: "100%" } : { height: 0, width: 0 };

  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      style={inlineStyle}
      className={"transition-height ease overflow-hidden duration-500 " + className}
    >
      {children}
    </div>
  );
};

export default Collapse;