import { getIcon } from "@data/icons";
import styled from "styled-components";

interface CloseButtonProps {
  onClose: () => void;
}

const StyledCloseButton = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: white;

  z-index: 2;

`;

function CloseButton(props: CloseButtonProps) {
  const { onClose } = props;
  return (
    <StyledCloseButton onClick={onClose}>{getIcon("Close")}</StyledCloseButton>
  );
}

export default CloseButton;
