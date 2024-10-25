import styled from "styled-components";

const StyledMain = styled.main`
  position: relative;
  overflow: hidden;
  background: var(--color-chat-wallpaper-1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    -webkit-mask-image: linear-gradient(to bottom, transparent, white);
    mask-image: linear-gradient(to bottom, transparent, white);
    background: var(--color-chat-wallpap7er-2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--chat-wallpaper-bg);
    background-position: center;
    background-size: cover;
    opacity: 0.6;
    z-index: 9;
  }
`;

function Main({ children }: { children?: React.ReactNode }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
