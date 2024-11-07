import styled, { css } from "styled-components";

const Button = styled.button<{ $type?: string }>`
  font-weight: bold;
  letter-spacing: 1.5px;
  border: none;
  border-radius: var(--border-radius-default-tiny);
  padding: 0.6rem 1rem;
  background-color: var(--accent-color);
  color: var(--color-text-button);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--accent-color-shade);
  }

  &:disabled {
    opacity: 0.6;
  }

  ${(props) =>
    props.$type === "modal" &&
    css`
      font-weight: normal;
      letter-spacing: normal;
    `}
  ${(props) =>
    props.$type === "danger" &&
    css`
      background-color: var(--color-error);
      color: var(--color-text-button);
      font-weight: normal;
      &:hover {
        background-color: var(--color-error-shade);
      }
    `}
`;

export default Button;
