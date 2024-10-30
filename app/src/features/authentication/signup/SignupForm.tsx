import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "./hooks/useSignup";
import { UseSendConfirmationEmail } from "./hooks/useSendConfirmationEmail";
import { schema } from "./schema/signup";

import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "@components/Button";
import InputField from "@components/inputs/input-field/InputField";
import TelephoneInputField from "@components/inputs/input-field/TelephoneInputField";
import ConfirmationEmailModal from "./ConfirmationEmailModal";
import PasswordInputField from "@components/inputs/input-field/PasswordInputField";
import { RECAPTCHA_SITE_KEY } from "@constants";
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
  margin-bottom: 5rem;
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

export default function SignupForm() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { signup, isPending, isSuccess } = useSignup();
  const { SendConfirmationCode, isSuccess: isEmailSent } =
    UseSendConfirmationEmail();
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
    watch,
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
      reCaptchaResponse: `${RECAPTCHA_SITE_KEY}`,
    },
  });

  const onSubmit: SubmitHandler<User> = function (userData) {
    signup(userData, {
      onSuccess: () => {
        SendConfirmationCode(userData.email);
        setIsOpen(isEmailSent);
      },
      onError: (error) => {
        setError(error.message);
      },
      onSettled: () => {
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
        email={watch("email")}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <InputField
            data-testid="username-input"
            label="User Name"
            type="text"
            id="username"
            register={register}
            placeholder="User Name"
            autoComplete="username"
            error={errors.username?.message}
          />

          <InputField
            data-testid="email-input"
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
            data-testid="phone-number-input"
            control={control}
            placeholder="Phone Number"
            autoComplete="tel"
            error={errors.phoneNumber?.message}
          />

          <PasswordInputField
            data-testid="password-input"
            label="Password"
            id="password"
            register={register}
            placeholder="Password"
            autoComplete="new-password"
            error={errors.password?.message}
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

        <ReCAPTCHA
          data-testid="recaptcha"
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
        />
        {error && <Error>{errors.reCaptchaResponse?.message}</Error>}

        <Button type="submit" data-testid="submit-button">
          {isPending ? "Loading..." : "Sign up"}
        </Button>
        {error && <Error data-testid="error-signup">{error}</Error>}
      </Form>
    </>
  );
}
