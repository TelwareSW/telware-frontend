import styled from "styled-components";
import CircleIcon from "./CircleIcon";
import ChatsSidebarHeader from "./ChatsSideBarHeader";
import StartNewChat from "./StartNewChat";

interface ChatsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const StyledChatsSideBar = styled.div`
  height: 100vh;
  color: var(--color-icon-secondary);

  background-color: var(--color-background);
  overflow-y: auto;
  position: relative;
`;
function ChatsSideBar({ children }: ChatsSideBarProps) {
  return (
    <StyledChatsSideBar>
      <ChatsSidebarHeader />
      {children}
      <CircleIcon
        icon="AddStory"
        right={1}
        bottom={1}
        size={3.3}
        padding={0.5}
        color="white"
        bgColor="var(--color-search-border)"
      />
      <StartNewChat />
    </StyledChatsSideBar>
  );
}

export default ChatsSideBar;
