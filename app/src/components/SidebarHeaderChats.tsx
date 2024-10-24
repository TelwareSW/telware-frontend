import styled from "styled-components";
import ChatsSearchbar from "./ChatsSearchbar";
import SettingsToolbar from "./SettingsToolbar";
const StyledSidebarHeader = styled.header`
  background: var(--color-background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0.375rem 0.8125rem 0.5rem 1.3rem;
  position: relative;
`;

function SidebarHeaderChats() {
  return (
    <StyledSidebarHeader>
      <SettingsToolbar />
      <ChatsSearchbar />
    </StyledSidebarHeader>
  );
}

export default SidebarHeaderChats;
