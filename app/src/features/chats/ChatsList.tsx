import styled from "styled-components";
import ChatItem from "./ChatItem";
import { useChats } from "./hooks/useChats";
import { useAppSelector } from "@hooks/useGlobalState";

const ChatListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
  background-color: var(--color-background);
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
        let viewChat = true;

        return viewChat ? <ChatItem chat={chat} key={chat._id} /> : null;
      })}
    </ChatListContainer>
  );
};

export default ChatsList;
