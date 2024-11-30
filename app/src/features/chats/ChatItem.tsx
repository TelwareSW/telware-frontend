import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Avatar from "./Avatar";
import { Chat } from "@mocks/data/Chats";

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
  chat: Chat;
};

function ChatItem({ chat: { _id, members, type } }: ChatItemProps) {
  const name = members[0]?.screenFirstName || members[0]?.username;
  const image = members[0]?.photo?.length > 50 ? members[0]?.photo : undefined;
  const navigate = useNavigate();

  const timestamp = "12:00 PM";
  const lastMessage = "Hello";

  const { chatId } = useParams<{ chatId: string }>();

  const handleOpenChat = () => {
    navigate(`/${_id}`);
  };

  return (
    <Container
      $active={Number(chatId) === _id}
      onClick={handleOpenChat}
      key={_id}
    >
      <Avatar image={image} name={name?.charAt(0)} />
      <ChatContent>
        <ChatHeader>
          <Name>{type === "private" ? name : "Group"}</Name>
          <Timestamp>{timestamp || "No messages"}</Timestamp>
        </ChatHeader>
        <LastMessage>{lastMessage || "No messages"}</LastMessage>
      </ChatContent>
    </Container>
  );
}

export default ChatItem;
