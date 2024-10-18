import { ComponentProps } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type TextInputType = {
  label: string;
  register?: UseFormRegister<any>;
  id: string;
  error?: string | undefined;
} & ComponentProps<"input">;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const TextInput = styled.input`
  outline: none;
  border: 1px solid var(--color-text-secondary);
  padding: 0.75rem 0.9rem;

  width: 100%;
  background-color: var(--color-background);

  transition: border-color 0.15s ease;
  color: var(--color-text);

  word-break: break-word;
  border-radius: 0.75rem;

  font-size: 1rem;
  line-height: 1.25rem;

  &:hover {
    border-color: var(--accent-color);
  }

  &:focus {
    border-color: var(--accent-color);
    border-width: 2px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0.75rem;
  left: 0.9rem;
  background-color: var(--color-background);

  font-size: 1rem;
  color: var(--color-text-secondary);
  transition: all 0.15s ease-out;

  ${TextInput}:hover + & {
    color: var(--accent-color);
  }

  ${TextInput}:focus + & {
    color: var(--accent-color);
    transform: translateY(-98%) translateX(-11%) scale(0.7);
  }
`;

export default function TextBox({
  label,
  register,
  id,
  error,
  ...props
}: TextInputType) {
  return (
    <InputGroup>
      <TextInput id={id} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </InputGroup>
  );
}
