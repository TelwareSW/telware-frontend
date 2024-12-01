import { useState } from "react";

function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleOpenList(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsHovered(true);
  }

  return { isHovered, handleMouseLeave, handleOpenList };
}

export default useHover;
