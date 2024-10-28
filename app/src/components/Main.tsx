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

    -webkit-mask-image: linear-gradient(to bottom, transparent, black);
    mask-image: linear-gradient(to bottom, transparent, black);
    background: var(--color-chat-wallpaper-2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-position: center;
    background-size: cover;
    opacity: var(--bg-image-opacity);
    background-image: var(--chat-wallpaper-bg);
  }
`;

function Main({ children }: { children?: React.ReactNode }) {
  return <StyledMain data-testid="main">{children}</StyledMain>;
}

export default Main;
