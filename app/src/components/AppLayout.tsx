import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";
import SideBar from "./side-bar/SideBar";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";
import { useState } from "react";

const StyledApp = styled.div<{
  $isChatOpen: boolean;
  $isRightSideBarOpen: boolean;
}>`
  @media ${MOBILE_VIEW} {
    & > main {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "contents" : "none")};
    }

    & > aside {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "none" : "contents")};
    }
  }

  @media ${DESKTOP_VIEW} {
    display: grid;
    grid-template-columns: ${({ $isRightSideBarOpen }) =>
      $isRightSideBarOpen ? "1.5fr 3fr 1.5fr" : "1.5fr 4.5fr"};

    overflow-x: hidden;

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

  const [showRightSideBar, setShowRightSideBar] = useState<boolean>(false);

  return (
    <StyledApp
      $isChatOpen={isChatOpen}
      data-testid="app-layout"
      $isRightSideBarOpen={showRightSideBar}
    >
      <SideBar type="left" />
      <Main>
        <Outlet context={{ setShowRightSideBar, showRightSideBar }} />
      </Main>
      {showRightSideBar && <SideBar type="right" />}
    </StyledApp>
  );
}

export default AppLayout;
