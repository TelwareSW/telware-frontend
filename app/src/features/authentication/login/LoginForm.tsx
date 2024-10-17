import { useForm, SubmitHandler } from "react-hook-form";

import styled from "styled-components";

import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

type FormValues = {
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

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          register={register}
          placeholder="Password"
          autoComplete="current-password"
        />
      </Inputs>

      <P>Forgot password?</P>

      <Button type="submit">Login</Button>
    </Form>
  );
}
