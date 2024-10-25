import styled from "styled-components";
import Main from "./Main";
import SideBar from "./SideBar";
const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

function AppLayout() {
  return (
    <StyledApp>
      <SideBar />
      <Main />
    </StyledApp>
  );
}

export default AppLayout;
