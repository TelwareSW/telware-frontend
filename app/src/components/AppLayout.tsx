import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { media } from "data/deviceSize";

import Main from "./Main";
import SideBar from "./side-bar/SideBar";
import { MOBILE_VIEW } from "@constants";

const StyledApp = styled.div<{ $isChatOpen: boolean }>`
  @media ${MOBILE_VIEW} {
    & > main {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "contents" : "none")};
    }

    & > aside {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "none" : "contents")};
    }
  }

  @media ${media.desktop} {
    display: grid;
    grid-template-columns: 2fr 5fr;

    & > main {
      display: block;
    }

    & > aside {
      display: block;
    }
  }
`;

function AppLayout() {
  const { chatId } = useParams();

  const isChatOpen = !!chatId;

  return (
    <StyledApp $isChatOpen={isChatOpen} data-testid="app-layout">
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledApp>
  );
}

export default AppLayout;
