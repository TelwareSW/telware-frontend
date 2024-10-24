import styled from "styled-components";

const StyledSidebar = styled.div`
  height: 100vh;

  background-color: var(--color-background);
  border-right: 5px solid var(--color-border);
  overflow-y: auto;
  /* overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  } */
`;

interface SidebarProps {
  children?: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  return <StyledSidebar>{children}</StyledSidebar>;
}

export default Sidebar;
