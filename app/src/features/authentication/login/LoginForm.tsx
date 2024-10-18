import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import styled from "styled-components";

import { useLogin } from "./hooks/useLogin";
import { schema } from "./schema/login";

import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

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

const P = styled.p`
  color: var(--color-text-secondary);
`;

const Error = styled.p`
  align-self: center;
  color: var(--color-error);
`;

export default function LoginForm() {
  const { login, isPending } = useLogin();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<User> = function (data) {
    console.log(data);
    login(data, {
      onSettled: (_, error) => {
        setError(error ? error.message : "");
        reset();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Inputs>
        <InputField
          label="Email"
          type="email"
          id="email"
          register={register}
          placeholder="Email"
          autoComplete="email"
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          register={register}
          placeholder="Password"
          autoComplete="current-password"
          error={errors.password?.message}
        />
      </Inputs>

      <P>Forgot password?</P>

      <Button type="submit">{isPending ? "Loading..." : "Login"}</Button>
      {error && <Error>{error}</Error>}
    </Form>
  );
}
