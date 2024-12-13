import { getIcon } from "@data/icons";
import styled from "styled-components";

interface StorySliderTooltipProps {
  isMine?: boolean;
  isPaused: boolean;
  onPause: () => void;
  onDelete?: () => void;
}

const StyledToolTip = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;

  z-index: 1;

  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const Button = styled.div`
  cursor: pointer;
  color: white;
  svg {
    font-size: 2rem;
  }
`;
function StorySliderTooltip(props: StorySliderTooltipProps) {
  const { isMine, onPause, onDelete, isPaused } = props;
  return (
    <StyledToolTip>
      {isPaused ? (
        <Button onClick={onPause}>{getIcon("Play")}</Button>
      ) : (
        <Button onClick={onPause}>{getIcon("Pause")}</Button>
      )}
      {isMine && <Button onClick={onDelete}>{getIcon("Delete")}</Button>}
    </StyledToolTip>
  );
}

export default StorySliderTooltip;
