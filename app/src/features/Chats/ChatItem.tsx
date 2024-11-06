import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Avatar from "./Avatar";
import { Chat } from "@mocks/data/Chats";

const Container = styled.div<{ $active?: boolean }>`
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
  chat: Chat;
};

function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();

  const handleOpenChat = () => {
    navigate(`/${chat.id}`);
  };

  return (
    <Container
      $active={Number(chatId) === chat.id}
      onClick={handleOpenChat}
      key={chat.id}
    >
      <Avatar image={chat.image} name={chat.name} />
      <ChatContent>
        <ChatHeader>
          <Name>{chat.name}</Name>
          <Timestamp>{chat.timestamp}</Timestamp>
        </ChatHeader>
        <LastMessage>{chat.lastMessage}</LastMessage>
      </ChatContent>
    </Container>
  );
}

export default ChatItem;
