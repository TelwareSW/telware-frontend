import React from "react";
import styled from "styled-components";
import { useState } from "react";
import CodeInputField from "../../../components/CodeInputField";

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

const Button = styled.button<{ disabled?: boolean }>`
  border: none;
  border-radius: var(--border-radius-default-tiny);
  padding: 0.6rem 1rem;
  margin: 1rem;
  background-color: ${({ disabled }) =>
    disabled ? "transparent" : "var(--accent-color)"};
  color: ${({ disabled }) =>
    disabled ? "var( --color-text-secondary)" : "var(--color-text-button)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background-color: "var(--color-item-hover)";
  }
`;
const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-color: (--accent-color: #56a2c9);
`;

const ModalMessage = styled.p`
  margin-bottom: 2rem;
`;

type ConfirmationEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
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

const ResendText = styled.span`
  color: var(--accent-color);
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-hover);
  }
`;

function ConfirmationEmailModal({
  isOpen,
  onClose,
}: ConfirmationEmailModalProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  if (!isOpen) return null;
  console.log(code.join(""));
  function handleConfirmCode() {}
  function handleResendEmail() {}
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Check Your Email!</ModalTitle>

        <ModalMessage>
          A confirmation email has been sent to your email address. Please check
          your inbox to verify your account.
        </ModalMessage>
        <CodeInputField code={code} setCode={setCode} />
        <Button onClick={handleConfirmCode} disabled={code.join("").length < 6}>
          Verify
        </Button>
        <ModalMessage>
          Didn't get an email?{" "}
          <ResendText onClick={handleResendEmail}>resend email</ResendText>
        </ModalMessage>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ConfirmationEmailModal;
