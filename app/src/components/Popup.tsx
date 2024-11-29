import styled from "styled-components";
import CloseButton from "./CloseButton";
import ReactDOM from "react-dom";

interface PopupProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const PopupContainer = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  height: 100%;
`;

function Popup({ onClose, isOpen, children }: PopupProps) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <PopupOverlay>
      <PopupContainer>
        <CloseButton onClose={onClose} />
        {children}
      </PopupContainer>
    </PopupOverlay>,
    document.body
  );
}
export default Popup;
