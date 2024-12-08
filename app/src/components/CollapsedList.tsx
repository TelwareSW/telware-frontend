import styled from "styled-components";

interface CollapsedListProps {
  onOpen: () => void;
  render: (data: unknown) => JSX.Element;
  list: unknown[];
}

const StyledCollapsedList = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;
const CollapsedItem = styled.div<{ $index: number }>`
  position: absolute;
  z-index: 30 - index;
  right: ${(props) => props.$index * 15 + 20}px;
  top: 0.7rem;
  transform: scale(0.8);
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

function CollapsedList(Props: CollapsedListProps) {
  const { onOpen, render, list } = Props;
  const displayedItems = list?.slice(0, 3);

  return (
    <StyledCollapsedList onClick={onOpen}>
      {displayedItems?.map((element, index) => (
        <CollapsedItem key={index} $index={index}>
          {render(element)}
        </CollapsedItem>
      ))}
    </StyledCollapsedList>
  );
}

export default CollapsedList;
