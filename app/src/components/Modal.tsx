import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-color: (--accent-color: #56a2c9);
`;

const ModalMessage = styled.p`
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--accent-color);
  cursor: pointer;

  &:hover {
    color: var(--color-item-hover);
  }
`;

function Modal({ onClose, isOpen, title, message, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
}
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  children: React.ReactNode;
};
export default Modal;
