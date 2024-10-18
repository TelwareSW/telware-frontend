import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface FloatingLabelInputProps<TFormValues extends FieldValues> {
  label: string;
  id: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  error?: string;
  maxLength?: number;
  validation?: (value: string) => boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  disabled?: boolean;
}

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

interface StyledInputProps {
  $hasError: boolean;
  $isValid: boolean;
}

const Input = styled.input<StyledInputProps>`
  --border-width: 1px;
  outline: none;
  border: var(--border-width) solid var(--color-text-secondary);
  padding: calc(0.75rem - var(--border-width))
    calc(0.9rem - var(--border-width));
  width: 100%;
  height: 3.375rem;
  background-color: var(--color-background);
  transition: all 0.15s ease;
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
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
  }

  ${({ $hasError }) =>
    $hasError &&
    `
    border-color: var(--color-error);
    &:hover, &:focus {
      border-color: var(--color-error);
      box-shadow: 0 0 0 0.1rem var(--color-error) inset;
    }
  `}

  ${({ $isValid }) =>
    $isValid &&
    `
    border-color: var(--color-success);
    &:hover, &:focus {
      border-color: var(--color-success);
      box-shadow: 0 0 0 0.1rem var(--color-success) inset;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface LabelProps {
  $isFloating: boolean;
  $hasError: boolean;
}

const Label = styled.label<LabelProps>`
  position: absolute;
  left: 0.9rem;
  background-color: var(--color-background);
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  transition: all 0.15s ease-out;
  pointer-events: none;
  transform-origin: left center;
  padding-inline: 0.2rem;

  ${({ $isFloating }) =>
    $isFloating
      ? `
      top: 0;
      transform: translateY(-50%) scale(0.7);
    `
      : `
      top: 0.9rem;
    `}

  ${Input}:hover + & {
    color: var(--accent-color);
  }

  ${Input}:focus + & {
    color: var(--accent-color);
    top: 0;
    transform: translateY(-50%) scale(0.7);
  }

  ${({ $hasError }) =>
    $hasError &&
    `
    color: var(--color-error) !important;
  `}
`;

const CharCount = styled.span`
  position: absolute;
  bottom: -0.7rem;
  right: 0.9rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  background-color: var(--color-background);
`;

export default function FloatingLabelInput<TFormValues extends FieldValues>({
  label,
  register,
  id,
  error,
  maxLength,
  validation,
  type = "text",
  ...props
}: FloatingLabelInputProps<TFormValues>) {
  const [value, setValue] = useState("");
  const [isFloating, setIsFloating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsFloating(value !== "");
    if (validation) {
      setIsValid(validation(value) && value !== "");
    }
  }, [value, validation]);

  const registeredProps = register ? register(id) : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (registeredProps?.onChange) {
      registeredProps.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsFloating(false);
    }
    if (registeredProps?.onBlur) {
      registeredProps.onBlur(e);
    }
  };

  return (
    <InputGroup>
      <Input
        id={id}
        type={type}
        {...props}
        {...registeredProps}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFloating(true)}
        onBlur={handleBlur}
        $hasError={!!error}
        $isValid={isValid}
        maxLength={maxLength}
      />
      <Label htmlFor={id} $isFloating={isFloating} $hasError={!!error}>
        {error || label}
      </Label>
      {maxLength && (
        <CharCount>
          {value.length}/{maxLength}
        </CharCount>
      )}
    </InputGroup>
  );
}
