import styled from "styled-components";
import Main from "./Main";
import SideBar from "./side-bar/SideBar";
import { media } from "data/deviceSize";

const StyledApp = styled.div`
  @media ${media.mobile} {
    & > main {
      display: none;
    }
  }

  @media ${media.desktop} {
    display: grid;
    grid-template-columns: 1fr 3fr;

    & > main {
      display: block;
    }
  }
`;
function AppLayout() {
  return (
    <StyledApp data-testid="app-layout">
      <SideBar />
      <Main />
    </StyledApp>
  );
}

export default AppLayout;
