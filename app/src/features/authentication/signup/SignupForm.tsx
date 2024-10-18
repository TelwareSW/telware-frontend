import { useForm, SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

export type User = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  reCaptchaResponse: string;
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

export default function SignupForm() {
  const { register, handleSubmit, setValue } = useForm<User>();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onSubmit: SubmitHandler<User> = function (data) {
    console.log("Form data:", data);
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setValue("reCaptchaResponse", token);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Inputs>
        <InputField
          label="User Name"
          type="text"
          id="username"
          register={register}
          placeholder="User Name"
          autoComplete="username"
          error=""
        />

        <InputField
          label="Email"
          type="email"
          id="email"
          register={register}
          placeholder="Email"
          autoComplete="email"
          error=""
        />

        <InputField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          register={register}
          placeholder="Phone Number"
          autoComplete="tel"
          error=""
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          register={register}
          placeholder="Password"
          autoComplete="new-password"
          error=""
        />

        <InputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          register={register}
          placeholder="Confirm Password"
          autoComplete="new-password"
          error=""
        />
      </Inputs>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}
        onChange={handleRecaptchaChange}
      />

      <Button type="submit">Sign up</Button>
    </Form>
  );
}
