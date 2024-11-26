import styled from "styled-components";

const StyledMain = styled.main`
  position: relative;
  overflow: hidden;
  background: var(--color-chat-wallpaper-1);
`;

function Main({ children }: { children?: React.ReactNode }) {
  return <StyledMain data-testid="main">{children}</StyledMain>;
}

export default Main;
