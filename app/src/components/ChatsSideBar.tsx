import styled from "styled-components";
import CircleIcon from "./CircleIcon";
import ChatsSidebarHeader from "./ChatsSideBarHeader";

interface ChatsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}
const StyledChatsSideBar = styled.div`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
  position: relative;
`;
function ChatsSideBar({ children }: ChatsSideBarProps) {
  const toggleModalDisplay = () => {
    console.log("Toggle modal display");
  };
  return (
    <StyledChatsSideBar>
      <ChatsSidebarHeader />
      {children}
      <CircleIcon
        icon="AddStory"
        onClick={toggleModalDisplay}
        right="1rem"
        bottom="1rem"
        size={3.3}
        padding={0.5}
        color="white"
        bgColor="var(--color-search-border)"
      />
      <CircleIcon
        icon="Edit"
        onClick={toggleModalDisplay}
        right="1.4rem"
        bottom="5.5rem"
        padding={0.5}
        size={2.3}
        bgColor="var(--pattern-color)"
        color="var(--color-icon-secondary)"
      />
    </StyledChatsSideBar>
  );
}

export default ChatsSideBar;
