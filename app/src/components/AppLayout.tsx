import ChatsSideBar from "./ChatsSideBar";
import Main from "./Main";
import Sidebar from "./Sidebar";
import styled from "styled-components";
const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
function AppLayout() {
  return (
    <StyledApp>
      <Sidebar>
        <ChatsSideBar />
      </Sidebar>
      <Main />
    </StyledApp>
  );
}

export default AppLayout;
