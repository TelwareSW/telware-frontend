import styled from "styled-components";
import PickerItem from "./PickerItem";

interface PickerProps {
  onItemSelect: (url: string) => void;
  onMount: () => any;
}

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 90px);
  gap: 2px;
  align-items: center;
  justify-content: center;
  height: 100%;
  list-style: none;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 1rem;
  }
`;

const GridPicker = (props: PickerProps) => {
  const { onItemSelect, onMount } = props;
  const { data: displayedItems } = onMount();
  return (
    <Grid>
      {displayedItems?.map((element, index: number) => (
        <PickerItem key={index} onItemSelect={onItemSelect} {...element} />
      ))}
    </Grid>
  );
};

export default GridPicker;
