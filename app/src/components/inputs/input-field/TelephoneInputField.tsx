import { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import styled from "styled-components";
import "react-international-phone/style.css";

type InputType = {
  label: string;
  control: any;
  id: string;
  error: string | undefined;
} & ComponentProps<"input">;

const InputWrapper = styled.div`
  position: relative;
  padding: 0.9rem 0 0;
  margin-top: 0.626rem;
`;

const StyledLabel = styled.label`
  display: block;
  top: 0;
  position: absolute;
  font-size: 1rem;
  color: var(--color-text-secondary);
  transition: 0.2s;
`;

const StyledPhoneInput = styled(PhoneInput)`
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1.25rem;
  border: none;
  outline: none;
  color: var(--color-text);
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--accent-color);
  }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown + ${StyledLabel} {
    cursor: text;
    top: 1rem;
  }

  &:focus + ${StyledLabel} {
    top: 0;
    font-size: 0.8rem;
    color: var(--accent-color);
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }

  .react-international-phone-input-container {
    border: none;
    border-bottom: 1px solid var(--color-borders-input);
    width: 100%;
  }

  .react-international-phone-input {
    width: 100%;
  }
`;

const Error = styled.p`
  color: var(--color-error);
`;

function TelephoneInputField({ label, id, control, error }: InputType) {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <StyledPhoneInput defaultCountry="eg" {...field} />
        )}
      />
      <Error>{error}</Error>
    </InputWrapper>
  );
}
export default TelephoneInputField;
