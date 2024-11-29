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
  z-index: 100;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const StyledButton = styled.div`
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
        <StyledButton onClick={onPause}>{getIcon("Play")}</StyledButton>
      ) : (
        <StyledButton onClick={onPause}>{getIcon("Pause")}</StyledButton>
      )}
      {isMine && (
        <StyledButton onClick={onDelete}>{getIcon("Delete")}</StyledButton>
      )}
    </StyledToolTip>
  );
}

export default StorySliderTooltip;
