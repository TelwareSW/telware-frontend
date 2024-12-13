import { useState } from "react";
import styled from "styled-components";
import Avatar from "@components/Avatar";
import { getIcon } from "@data/icons";
import Icon from "@components/Icon";
import SearchBar from "@features/search/components/SearchBar";
import PinnedMessages from "@features/pin-messages/components/PinnedMessages";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { getChatByID } from "./utils/helpers";
import { useChatMembers } from "./hooks/useChatMember";
import { getElapsedTime } from "@utils/helpers";
import { useSocket } from "@hooks/useSocket";
import CallLayout from "@features/calls/CallLayout";
import { useBlock } from "@features/privacy-settings/hooks/useBlock";
import { setChatIsBlocked } from "@state/messages/chats";
const Container = styled.div<{ hasMargin?: boolean }>`
  position: absolute;
  top: 0;
  z-index: 2;

  height: 3.5rem;
  width: 100%;
  background-color: var(--color-background);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-inline: 1rem;

  margin: ${({ hasMargin }) => (hasMargin ? "1rem 0" : "0")};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 60%;
`;

const LastSeen = styled.span`
  font-size: 0.875rem;
  line-height: 0.9rem;
  color: var(--color-text-secondary);
`;

const Name = styled.span`
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-weight: 500;
  line-height: 1.3125rem;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InvisibleButton = styled.button`
  all: unset;
  display: inline-block;
  cursor: pointer;
`;

const StyledButton = styled.button`
  background: linear-gradient(
    to left,
    var(--color-background-own-3),
    var(--color-background-own-4)
  );

  border: none;
  width: 7rem;
  height: 2rem;
  border-radius: 0.5rem;
  color: var(--color-text);
  margin-right: 1rem;

  color: var(--color-background);
`;

//TODO: refactor
function Topbar() {
  const { chatId } = useParams<{ chatId: string }>();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const chats = useAppSelector((state) => state.chats.chats);
  const [isSearching, setIsSearching] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { startConnection } = useSocket();
  const chat = chatId
    ? getChatByID({
        chatID: chatId,
        chats: chats,
      })
    : undefined;

  const membersData = useChatMembers(chat?.members);
  const { removeFromBlockList } = useBlock();

  let image;
  let lastSeen;

  if (chat) {
    lastSeen = chat?.lastMessage?.timestamp;
    image = membersData[0]?.photo;
  }

  if (!chat) return null;

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  const dispatch = useAppDispatch();

  async function handleRemoveFromBlock() {
    await removeFromBlockList({ id: membersData[0]._id });
    dispatch(
      setChatIsBlocked({
        chatId: chatId!,
        isBlocked: false,
        userId: userId,
      })
    );
  }

  const isCall = true;
  return (
    <>
      {isCall && (
        <CallLayout
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          name={chat.name}
          image={image}
        />
      )}
      <Container hasMargin={isCollapsed}>
        <Avatar
          data-testid="chat-avatar"
          image={image}
          name={chat.name?.charAt(0)}
        />
        {isSearching ? (
          <SearchBar onClose={toggleSearch} />
        ) : (
          <>
            <Info data-testid="chat-info">
              <Content>
                <Name data-testid="chat-name">{chat.name}</Name>
                {lastSeen && (
                  <LastSeen data-testid="chat-last-seen">
                    last seen {getElapsedTime(lastSeen)}
                  </LastSeen>
                )}
              </Content>
            </Info>
            <PinnedMessages />
            {chat.isBlocked && (
              <StyledButton
                onClick={handleRemoveFromBlock}
                data-testid="unblock-button"
              >
                Unblock
              </StyledButton>
            )}
            <Icons>
              <InvisibleButton onClick={() => startConnection()}>
                <Icon>{getIcon("Call")}</Icon>
              </InvisibleButton>

              <IconButton onClick={toggleSearch} data-testid="search-button">
                {getIcon("Search")}
              </IconButton>
              <Icon>{getIcon("More")}</Icon>
            </Icons>
          </>
        )}
        {isSearching && <IconButton>{getIcon("CalendarToday")}</IconButton>}
      </Container>
    </>
  );
}

export default Topbar;
