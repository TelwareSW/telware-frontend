import styled from "styled-components";
import ChatsSidebarHeader from "./ChatsSideBarHeader";
import StartNewChat from "@features/chats/StartNewChat";
import AddStory from "@features/stories/components/AddStory";
import StoryListContainer from "@features/stories/components/StoryListContainer";

interface ChatsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const StyledChatsSideBar = styled.div`
  height: 100vh;
  color: var(--color-icon-secondary);
  background-color: var(--color-background);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;
const StyledButtonContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
  flex-direction: column-reverse;
  gap: 4rem;
`;
function ChatsSideBar({ children }: ChatsSideBarProps) {
  return (
    <StyledChatsSideBar>
      <ChatsSidebarHeader />
      {/* <StoryListContainer /> */}
      {children}
      <StyledButtonContainer>
        <AddStory />
        <StartNewChat />
      </StyledButtonContainer>
    </StyledChatsSideBar>
  );
}

export default ChatsSideBar;
