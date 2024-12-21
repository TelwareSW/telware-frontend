import styled from "styled-components";
import ChatsSidebarHeader from "./ChatsSideBarHeader";
import StartNewChat from "@features/chats/StartNewChat";
import AddStory from "@features/stories/components/AddStory";
import StoryListContainer from "@features/stories/components/StoryListContainer";
import TabedSearch from "@features/search/components/TabedSearch";

interface ChatsSideBarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const StyledChatsSideBar = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  color: var(--color-icon-secondary);
  background-color: var(--color-background);
  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  width: 3.3rem;
  left: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-direction: column-reverse;
  gap: 4rem;
  background-color: transparent;
  z-index: 1;
`;

function ChatsSideBar({ children }: ChatsSideBarProps) {
  return (
    <StyledChatsSideBar>
      <ChatsSidebarHeader />
      <div style={{ position: "relative", height: "100%" }}>
        <StoryListContainer />
        <div style={{ flex: 1, height: "calc(100% - 48px)" }}>{children}</div>
        <ButtonsContainer data-testid="button-container">
          <AddStory data-testid="add-story-button" />
          <StartNewChat data-testid="start-new-chat-button" />
        </ButtonsContainer>
        <TabedSearch />
      </div>
    </StyledChatsSideBar>
  );
}

export default ChatsSideBar;
