import styled from "styled-components";

import SideBarToolsButton from "./SideBarToolsButton";
import SearchBar from "./SearchBar";

const StyledHeader = styled.header`
  background: var(--color-background);
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  
  padding: 0.375rem 0.8125rem 0.5rem 1.3rem;
  height: 4rem;
  
  position: sticky;
  top: 0;
`;

function ChatsSidebarHeader() {
  return (
    <StyledHeader data-testid="chatlist-header">
      <SideBarToolsButton />
      <SearchBar />
    </StyledHeader>
  );
}

export default ChatsSidebarHeader;
