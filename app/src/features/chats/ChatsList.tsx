import styled from "styled-components";
import ChatItem from "./ChatItem";
import { useChats } from "./hooks/useChats";

const ChatListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
  background-color: var(--color-background);
`;

const ChatsList = () => {
  const { chats, isPending } = useChats();

  if (isPending) return;

  return (
    <ChatListContainer>
      {chats?.map((chat) => <ChatItem chat={chat} key={chat._id} />)}
    </ChatListContainer>
  );
};

export default ChatsList;
