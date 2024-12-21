import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import styled from "styled-components";

import { schema } from "../schema/login";

import ForgotPasswordModal from "../ForgotPasswordModal";

import Button from "@components/Button";
import InputField from "@components/inputs/input-field/InputField";
import PasswordInputField from "@components/inputs/password-input-field/PasswordInputField";
import SpinnerMini from "@components/SpinnerMini";
import ConfirmationEmailModal from "@features/authentication/signup/ConfirmationEmailModal";

import { useLogin } from "../hooks/useLogin";
import useAuthCheck from "../hooks/useAuthCheck";

const MAX_PASSWORD_LENGTH = 128;
const MAX_EMAIL_LENGTH = 254;

export type User = {
  email: string;
  password: string;
};

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

const Error = styled.p`
  align-self: center;
  color: var(--accent-color);
  cursor: pointer;
  text-decoration: underline;

  color: var(--color-error);
`;

const StyledSpan = styled.span`
  width: fit-content;
  color: var(--accent-color);
  position: relative;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    border-radius: 4px;
    background-color: var(--accent-color);
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export default function LoginForm() {
  useAuthCheck();
  const { login, isPending } = useLogin();

  const [error, setError] = useState("");
  const [isOpenForgetPasswordModal, setIsOpenForgetPasswordModal] =
    useState(false);
  const [isOpenConfirmEmailModal, setIsOpenConfirmEmailModal] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<User> = function (data) {
    if (
      data.email.length > MAX_EMAIL_LENGTH ||
      data.password.length > MAX_PASSWORD_LENGTH
    ) {
      setError("Invalid email or password");
      return;
    }

    login(data, {
      onSettled: (_, error) => {
        setError(error ? error.message : "");
      },
      onError: (error) => {
        setError(error ? error.message : "");
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes("email") &&
          errorMessage.includes("verify") &&
          !errorMessage.includes("register")
        ) {
          setIsOpenConfirmEmailModal(true);
          setEmail(data.email);
        }
      },

      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <ForgotPasswordModal
        isOpen={isOpenForgetPasswordModal}
        onClose={() => setIsOpenForgetPasswordModal(false)}
      />
      <ConfirmationEmailModal
        isOpen={isOpenConfirmEmailModal}
        onClose={() => setIsOpenConfirmEmailModal(false)}
        email={email}
      />
      <Form data-test="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            data-testid="login-email-input"
            label="Email"
            id="email"
            register={register}
            placeholder="Email"
            autoComplete="email"
            error={errors.email?.message}
          />

          <PasswordInputField
            data-testid="login-password-input"
            label="Password"
            id="password"
            register={register}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
          />
        </Inputs>

        <StyledSpan
          data-test="forgot-password-span"
          onClick={() => setIsOpenForgetPasswordModal(true)}
        >
          Forgot password?
        </StyledSpan>

        <Button
          data-testid="login-form-submit-button"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <SpinnerMini data-test="spinner" data-testid="spinner" />
          ) : (
            "Login"
          )}
        </Button>
        {error && <Error data-testid="login-zerror-message">{error}</Error>}
      </Form>
    </>
  );
}
