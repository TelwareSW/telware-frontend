import React from "react";
import styled from "styled-components";

const CodeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CodeInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 2px solid var(--accent-color);
  border-radius: 4px;
  color: var(--color-text);
  &:focus {
    outline: none;
    border-color: var(--color-hover);
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

interface CodeInputFieldProps {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

function CodeInputField({ code, setCode }: CodeInputFieldProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(0, 1);
    setCode(newCode);

    if (e.target.value && index < 5) {
      document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  };

  return (
    <CodeContainer>
      {code.map((digit, index) => (
        <CodeInput
          key={index}
          id={`code-input-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          placeholder="0"
        />
      ))}
    </CodeContainer>
  );
}

export default CodeInputField;
