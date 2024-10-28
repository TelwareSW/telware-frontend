import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import styled from "styled-components";

import { useLogin } from "../hooks/useLogin";
import { schema } from "../schema/login";

import ForgotPasswordModal from "../ForgotPasswordModal";

import Button from "@components/Button";
import InputField from "@components/InputField/InputField";
import SpinnerMini from "@components/SpinnerMini";
import PasswordInputField from "@components/inputs/password-input-field/PasswordInputField";

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
  const { login, isPending } = useLogin();

  const [error, setError] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<User> = function (data) {
    login(data, {
      onSettled: (_, error) => {
        setError(error ? error.message : "");
        reset();
      },
    });
  };

  return (
    <>
      <ForgotPasswordModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
      <Form data-test="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            data-test="login-email-input"
            label="Email"
            type="email"
            id="email"
            register={register}
            placeholder="Email"
            autoComplete="email"
            error={errors.email?.message}
          />

          <PasswordInputField
            data-test="login-password-input"
            label="Password"
            id="password"
            register={register}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
          />
        </Inputs>

        <StyledSpan data-test="forgot-password-span" onClick={handleOpenModal}>
          Forgot password?
        </StyledSpan>

        <Button
          data-test="login-form-submit-button"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <SpinnerMini data-test="spinner" data-testid="spinner" />
          ) : (
            "Login"
          )}
        </Button>
        {error && <Error data-test="login-error-message">{error}</Error>}
      </Form>
    </>
  );
}
