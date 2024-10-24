import React from "react";
import SidebarHeaderChats from "./SidebarHeaderChats";
import styled from "styled-components";

interface ChatsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}
const StyledChatsSideBar = styled.div`
  height: 100vh;
  background-color: var(--color-background);
  border-right: 5px solid var(--color-border);
  overflow-y: auto;
`;
function ChatsSideBar({ children, onNavigate }: ChatsSideBarProps) {
  return (
    <>
      <StyledChatsSideBar>
        <SidebarHeaderChats onNavigate={onNavigate} />
      </StyledChatsSideBar>

      {children}
    </>
  );
}

export default ChatsSideBar;
