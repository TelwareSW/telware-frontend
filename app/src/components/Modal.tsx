import React, { useRef } from "react";
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
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: relative;
  background: var(--color-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;
`;

const ModalTitle = styled.h2`
  color: var(--color-text);
`;

const ModalMessage = styled.p`
  color: var(--color-text-secondary);
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

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children: React.ReactNode;
};

function Modal({ onClose, isOpen, title, message, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClickOutside}>
      <ModalContainer ref={modalRef}>
        <CloseButton type="button" onClick={onClose} data-testid="close-button">
          &times;
        </CloseButton>
        <ModalTitle>{title}</ModalTitle>
        {message && <ModalMessage>{message}</ModalMessage>}
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
