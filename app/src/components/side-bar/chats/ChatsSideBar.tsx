import styled from "styled-components";
import ChatsSidebarHeader from "./ChatsSideBarHeader";
import StartNewChat from "./StartNewChat";
import CreateStory from "@features/stories/components/CreateStory";

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
      <CreateStory />
      <StartNewChat />
    </StyledChatsSideBar>
  );
}

export default ChatsSideBar;
