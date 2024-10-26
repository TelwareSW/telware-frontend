import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { useForgotPassword } from "./hooks/useForgotPassword";
import Modal from "@components/Modal";
import InputField from "@components/InputField";
import Button from "@components/Button";

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
type ForgetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
function ForgotPasswordModal({ isOpen, onClose }: ForgetPasswordModalProps) {
  const { forgotPassword, isSuccess, isError } = useForgotPassword();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<{ email: string }>({
    resolver: yupResolver(validationSchema),
  });
  const handleForgetPassword = () => {
    const email = watch("email");
    forgotPassword(email);
  };
  const handleModalClose = () => {
    reset();
    onClose();
  };
  const onSubmit: SubmitHandler<{ email: string }> = () => {
    handleForgetPassword();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Reset your password"
      message="Input your email and we'll send you instructions on how to reset your password"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            label="Email"
            id="email"
            register={register}
            error={errors.email?.message}
          />
        </Inputs>

        <Button $type='modal' type="submit" disabled={isSubmitting} aria-live="polite">
          {isSubmitting ? "Loading..." : "Reset Password"}
        </Button>

        <div>
          {isSuccess && !isValid && (
            <Success>Instructions were sent over email</Success>
          )}
          {isError && !isValid && <Error>There was an error, try again</Error>}
          {(isSuccess || isError) && (
            <ResendText onClick={handleSubmit(onSubmit)}>
              resend email
            </ResendText>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;
