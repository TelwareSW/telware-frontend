import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const StyledIcon = styled.button`
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: transparent;

  border-radius: var(--border-radius-modal);

  &:hover {
    background: var(--color-item-hover);
    cursor: pointer;
  }
`;

type IconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Icon({ children, ...props }: IconProps) {
  return <StyledIcon {...props}>{children}</StyledIcon>;
}
