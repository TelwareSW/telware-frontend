import { ComponentProps } from "react";
import styled from "styled-components";

const Icon = styled.div`
  display: flex;

  width: 2.5rem;
  height: 2.5rem;

  border: 2px solid var(--color-borders-input);
  border-radius: 50%;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background-color: var(--color-interactive-element-hover);
  }
`;

const Img = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

type LoginWithProps = ComponentProps<"img"> & ComponentProps<"div">;

function LoginWith({ onClick, alt, src }: LoginWithProps) {
  return (
    <Icon data-testid={`${alt}-img`} onClick={onClick}>
      <Img src={src} alt={alt} />
    </Icon>
  );
}

export default LoginWith;
