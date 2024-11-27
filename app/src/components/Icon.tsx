import { ReactNode } from "react";
import styled from "styled-components";

const StyledIcon = styled.div`
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius-modal);
  &:hover {
    background: var(--color-item-hover);
    cursor: pointer;
  }
`;

type IconProps = {
  children: ReactNode;
};

export default function Icon({ children }: IconProps) {
  return <StyledIcon>{children}</StyledIcon>;
}
