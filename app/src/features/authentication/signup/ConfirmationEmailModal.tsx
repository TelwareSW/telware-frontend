import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UseVerifyEmail } from "./hooks/useVerifyEmail";
import { UseSendConfirmationEmail } from "./hooks/useSendConfirmationEmail";
import CodeInputField from "@components/CodeInputField";

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
  background: var(--color-background);
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
  color: var(--accent-color);
`;

const ModalMessage = styled.p`
  margin-bottom: 2rem;
  color: var(--color-text);
`;

type ConfirmationEmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
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
const Error = styled.p`
  align-self: center;
  color: var(--color-error);
`;
const Success = styled.p`
  align-self: center;
  color: var(--color-success);
`;

function ConfirmationEmailModal({
  isOpen,
  onClose,
  email,
}: ConfirmationEmailModalProps) {
  const [codeDisplay, setCodeDisplay] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const {
    verifyCode,
    isPending: isPendingVerification,
    isSuccess: isVerified,
  } = UseVerifyEmail();
  const { SendConfirmationCode, isSuccess: isCodeRensent } =
    UseSendConfirmationEmail();
  const navigate = useNavigate();
  if (!isOpen) return null;
  function handleConfirmCode() {
    const code = codeDisplay.join("");
    verifyCode(
      { email, code },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 500);
        },
        onError: (err: Error) => {
          setError(err.message);
        },
      }
    );
  }
  function handleResendEmail() {
    SendConfirmationCode(email, {
      onError: (err) => {
        setError(err.message);
      },
    });
  }
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Check Your Email!</ModalTitle>

        <ModalMessage>
          A confirmation email has been sent to your email address. Please check
          your inbox to verify your account.
        </ModalMessage>
        <CodeInputField code={codeDisplay} setCode={setCodeDisplay} />
        <Button
          onClick={handleConfirmCode}
          disabled={codeDisplay.join("").length < 6}
        >
          {isPendingVerification ? "Loading..." : "Verify"}
        </Button>
        <Error>{error}</Error>
        {isVerified && <Success>you are verified,redirecting... </Success>}
        <ModalMessage>
          Didn't get an email?{" "}
          <ResendText onClick={handleResendEmail}>resend email</ResendText>
          {isCodeRensent && <Success>Code is resent! check your email</Success>}
        </ModalMessage>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ConfirmationEmailModal;
