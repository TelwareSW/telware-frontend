import { ComponentProps } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  padding: 0.9rem 0 0;
  margin-top: 0.626rem;
`;

const StyledInput = styled.input`
  width: 100%;

  outline: none;
  border: none;

  border-bottom: 1px solid var(--color-borders-input);
  padding: 0.375rem 0;

  transition: border-color 0.2s;

  color: var(--color-text);

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    cursor: text;
    top: 1rem;
  }

  &:focus ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
  }

  &:focus {
    padding-bottom: 0.375rem;
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`;

const StyledLabel = styled.label`
  display: block;

  position: absolute;
  top: 0;

  font-size: 1rem;

  color: var(--color-text-secondary);

  transition: 0.2s;
`;

const Error = styled.p`
  color: var(--color-error);
`;

type InputType = {
  label: string;
  register: any;
  id: string;
  error: string | undefined;
} & ComponentProps<"input">;

function InputField({ label, id, register, error, ...props }: InputType) {
  return (
    <InputWrapper>
      <StyledInput {...register(id)} id={id} {...props} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <Error>{error}</Error>
    </InputWrapper>
  );
}

export default InputField;
