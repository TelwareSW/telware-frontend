import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./schema/schema";

import PasswordInputField from "@components/inputs/input-field/PasswordInputField";
import Button from "@components/Button";

import { useResetPassword } from "./hooks/useResetPassword";
import useAuthCheck from "../login/hooks/useAuthCheck";

type ResetPassword = {
  newPassword: string;
  confirmPassword: string;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
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

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  color: var(--color-text);
`;

const Error = styled.p`
  align-self: center;
  color: var(--color-error);
`;
const Success = styled.p`
  align-self: center;
  color: var(--color-success);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;
const ModalMessage = styled.p`
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

function ResetPasswordModal() {
  const { resetPassword, isPending, isSuccess, isError } = useResetPassword();
  const { token } = useParams();
  const navigate = useNavigate();
  useAuthCheck();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPassword>({
    resolver: yupResolver(schema),
  });

  if (!token) {
    console.error("Token is missing in the URL.");
    return null;
  }

  const handleResetPassword = () => {
    resetPassword({
      token: token!,
      newPassword: watch("newPassword"),
      confirmPassword: watch("confirmPassword"),
    });
  };

  const onSubmit: SubmitHandler<ResetPassword> = function () {
    handleResetPassword();
    reset();
  };

  const handleLogin = () => {
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <ModalOverlay>
      <ModalContainer data-testid="forgot-password-modal">
        <ModalTitle>Change your password</ModalTitle>
        <ModalMessage>Enter your new password!</ModalMessage>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <PasswordInputField
              data-testid="password-input"
              label="Password"
              id="newPassword"
              register={register}
              placeholder="Password"
              autoComplete="new-password"
              error={errors.newPassword?.message}
            />
            <PasswordInputField
              data-testid="confirm-password-input"
              label="Confirm Password"
              id="confirmPassword"
              register={register}
              placeholder="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
            />
          </Inputs>

          {isSuccess ? (
            <Button onClick={handleLogin} data-testid="button-redirect">
              Login
            </Button>
          ) : (
            <Button
              $type="modal"
              type="submit"
              disabled={isPending}
              data-testid="button-submit"
            >
              Reset Password
            </Button>
          )}
          <div>
            {isSuccess && !isValid && (
              <Success data-testid="success-message">
                Your Password is reset!
              </Success>
            )}
            {isError && !isValid && (
              <Error data-testid="failure-message">
                There was an error, try again
              </Error>
            )}
          </div>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ResetPasswordModal;
