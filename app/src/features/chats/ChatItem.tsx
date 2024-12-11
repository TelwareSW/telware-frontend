import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Avatar from "@components/Avatar";
import { DetailedChatInterface } from "@state/messages/chats";
import { useChatMembers } from "./hooks/useChatMember";

const Container = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  transition: background-color 0.2s ease;

  background-color: ${({ $active }) =>
    $active ? "var(--color-chat-active)" : "transparent"};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "var(--color-chat-active)" : "var(--color-chat-hover)"};
  }
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-text);
`;

const Timestamp = styled.span`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

const LastMessage = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type ChatItemProps = {
  chat: DetailedChatInterface;
  onClick?: () => void;
};

function ChatItem({
  chat: { _id, members, type, lastMessage },
  onClick,
}: ChatItemProps) {
  const membersData = useChatMembers(members);

  const name =
    membersData[0]?.screenFirstName + " " + membersData[0]?.screenLastName ||
    membersData[0]?.username;
  const image = membersData[0]?.photo;
  const navigate = useNavigate();

  const timestamp = lastMessage?.timestamp || "No messages";
  const lastMessageContent = lastMessage?.content || "No messages";

  const { chatId } = useParams<{ chatId: string }>();

  const handleOpenChat = () => {
    navigate(`/${_id}`);
  };

  function getChatName() {
    let chatName;
    if (type === "group" || type === "channel") {
      chatName = name;
    } else {
      chatName = membersData[0]?.screenFirstName || membersData[0]?.username;
    }
    return chatName;
  }

  return (
    <Container
      data-testid="chat-container"
      $active={chatId === _id}
      onClick={onClick ? onClick : handleOpenChat}
      key={_id}
    >
      <Avatar data-testid="chat-avatar" image={image} name={getChatName()} />
      <ChatContent>
        <ChatHeader>
          <Name data-testid="chat-name">{getChatName()}</Name>
          <Timestamp data-testid="chat-timestamp">
            {new Date(timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }) || "No messages"}
          </Timestamp>
        </ChatHeader>
        <LastMessage data-testid="chat-last-message">
          {lastMessageContent || "No messages"}
        </LastMessage>
      </ChatContent>
    </Container>
  );
}

export default ChatItem;
