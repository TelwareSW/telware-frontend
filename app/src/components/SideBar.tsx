import styled from "styled-components";
import { useAppSelector } from "../hooks";

const StyledSidebar = styled.aside`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
  const { content } = useAppSelector((state) => state.sideBarData);

  return <StyledSidebar>{content}</StyledSidebar>;
}

export default Sidebar;
