import styled from "styled-components";
import ChatItem from "./ChatItem";
import { useChats } from "./hooks/useChats";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useChatMembers } from "./hooks/useChatMember";
import { setName, setPhoto } from "@state/messages/chats";

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
  const dispatch = useAppDispatch();

  chats.forEach((chat) => {
    if (chat.type === "private") {
      const memberData = useChatMembers(chat.members)[0];
      dispatch(
        setName({
          chatId: chat._id,
          name:
            memberData?.screenFirstName + " " + memberData?.screenLastName ||
            memberData?.username,
        })
      );

      dispatch(
        setPhoto({
          chatId: chat._id,
          photo: memberData?.photo,
        })
      );
    }
  });

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
