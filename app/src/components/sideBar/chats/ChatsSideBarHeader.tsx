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
  position: relative;
  height: 4rem;
`;

function ChatsSidebarHeader() {
  return (
    <StyledHeader>
      <SideBarToolsButton />
      <SearchBar />
    </StyledHeader>
  );
}

export default ChatsSidebarHeader;
