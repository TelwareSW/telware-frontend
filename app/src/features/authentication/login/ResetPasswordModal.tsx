import styled from "styled-components";
import * as yup from "yup";
import Modal from "@components/Modal";
import InputField from "@components/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPassword } from "./hooks/useResetPassword";

const Button = styled.button<{ disabled?: boolean }>`
  border: none;
  border-radius: var(--border-radius-default-tiny);
  padding: 0.6rem 1rem;
  margin: auto 1rem;
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

type ResetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const Error = styled.p`
  align-self: center;
  color: var(--color-error);
`;
const ResendText = styled.span`
  color: var(--accent-color);
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-hover);
  }
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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
  const { resetPassword, isPending, isSuccess, isError } = useResetPassword();
  const title = "Reset your password";
  const message =
    "Input your email and we'll send you instructions on how to reset your password";
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{
    email: string;
  }>({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Please enter a valid email")
          .required("Email is required"),
      })
    ),
  });

  const onSubmit: SubmitHandler<{
    email: string;
  }> = function () {
    handleResetPassword();
    reset();
  };
  const handleResetPassword = () => {
    const email = watch("email");
    resetPassword(email);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} message={message}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            label="email"
            id="email"
            register={register}
            error={errors.email?.message}
          />
        </Inputs>

        <Button type="submit" disabled={isPending || isSuccess}>
          Reset Password
        </Button>
        {isSuccess && (
          <div>
            <Success>Instructions were send over email</Success>
            <ResendText onClick={handleResetPassword}>resend email</ResendText>
          </div>
        )}
        {isError && (
          <div>
            <Error>There was an error, try </Error>
            <ResendText onClick={handleResetPassword}>resend email</ResendText>
          </div>
        )}
      </Form>
    </Modal>
  );
}

export default ResetPasswordModal;
