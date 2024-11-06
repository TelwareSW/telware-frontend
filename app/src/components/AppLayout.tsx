import styled from "styled-components";
import Main from "./Main";
import SideBar from "./side-bar/SideBar";
import { MOBILE_VIEW } from "@constants";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 24rem auto;
  height: 100dvh;

  & > main {
    display: block;
  }
  @media ${MOBILE_VIEW} {
    display: block;
    & > main {
      display: none;
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
