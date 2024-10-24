import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import TelephoneInputField from "../../../components/TelphoneInputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema/signup";
import { useSignup } from "./hooks/useSignup";
import ConfirmationEmailModal from "./ConfirmationEmailModal";

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
const Error = styled.p`
  align-self: center;
  color: var(--color-error);
`;
const Message = styled.p`
  align-self: center;
  color: var(--color-accent);
`;
export default function SignupForm() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { signup, isPending, isSuccess } = useSignup();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(isSuccess);
  }, [isSuccess]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "TestUser",
      email: "test@example.com",
      phoneNumber: "+1234567890",
      password: "password123",
      confirmPassword: "password123",
      reCaptchaResponse: `${import.meta.env.VITE_REACT_APP_SITE_KEY}`,
    },
  });

  const onSubmit: SubmitHandler<User> = function (data) {
    console.log("Form data:", data);
    signup(data, {
      onSettled: (_, error) => {
        setError(error ? error.message : "");
        reset();
      },
    });
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setValue("reCaptchaResponse", token);
    }
  };

  return (
    <>
      <ConfirmationEmailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            label="User Name"
            type="text"
            id="username"
            register={register}
            placeholder="User Name"
            autoComplete="username"
            error={errors.username?.message}
          />

          <InputField
            label="Email"
            type="email"
            id="email"
            register={register}
            placeholder="Email"
            autoComplete="email"
            error={errors.email?.message}
          />

          <TelephoneInputField
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            control={control}
            placeholder="Phone Number"
            autoComplete="tel"
            error={errors.phoneNumber?.message}
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            register={register}
            placeholder="Password"
            autoComplete="new-password"
            error={errors.password?.message}
          />

          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            register={register}
            placeholder="Confirm Password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
          />
        </Inputs>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}
          onChange={handleRecaptchaChange}
        />
        {error && <Error>{errors.reCaptchaResponse?.message}</Error>}

        <Button type="submit">{isPending ? "Loading..." : "Sign up"}</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </>
  );
}
