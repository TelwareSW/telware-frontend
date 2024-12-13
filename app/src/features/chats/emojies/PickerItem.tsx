import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import SpinnerMini from "@components/SpinnerMini";
interface PickerItemProps {
  id: string;
  title: string;
  url: string;
  onItemSelect: (url: string) => void;
}

const StyledPickerItem = styled.img`
  width: 90px;
  height: 90px;
  object-fit: fill;
  cursor: pointer;
  &:hover {
    background-color: var(--color-icon-secondary);
    border-radius: 0.5rem;
  }
`;
const ItemWrapper = styled.li`
  cursor: pointer;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PickerItem(props: PickerItemProps) {
  const { id, title, url, onItemSelect } = props;
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <ItemWrapper ref={ref} onClick={() => onItemSelect(url)}>
      {inView ? (
        <StyledPickerItem id={id} title={title} src={url} />
      ) : (
        <SpinnerMini />
      )}
    </ItemWrapper>
  );
}

export default PickerItem;
