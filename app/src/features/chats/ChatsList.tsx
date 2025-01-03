import styled from "styled-components";
import ChatItem from "./ChatItem";
import { useChats } from "./hooks/useChats";
import { useAppSelector } from "@hooks/useGlobalState";

const ChatListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 600px;
  background-color: var(--color-background);
  overflow-y: scroll;
  padding-bottom: 2rem;
`;

const ChatsList = () => {
  const { isPending } = useChats();
  const chats = useAppSelector((state) => state.chats.chats);

  if (isPending) return;

  return (
    <ChatListContainer>
      {chats
        ?.slice()
        .reverse()
        .map((chat) => {
          return <ChatItem chat={chat} key={chat._id} />;
        })}
    </ChatListContainer>
  );
};

export default ChatsList;
