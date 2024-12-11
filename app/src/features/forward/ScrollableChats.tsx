import { ScrollContainer } from "styles/GlobalStyles";
import styled from "styled-components";
import Heading from "@components/Heading";
import Icon from "@components/Icon";
import { getIcon } from "@data/icons";
import { useMessageSender } from "@features/chats/hooks/useMessageSender";
import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { useSelectedMessages } from "@features/chats/hooks/useSelectedMessages";
import { getChatByID } from "@features/chats/utils/helpers";
import ChatItem from "@features/chats/ChatItem";

const OuterContainer = styled.ul`
  position: absolute;
  width: 60%;
  right: auto;
  left: auto;
  top: -40rem;
  height: 30rem;
  z-index: 1000;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: start;
  list-style: none;
  padding: 0.2rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-default);
`;

const IconWrapper = styled.div`
  border-right: 1px solid var(--color-text-secondary);
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid var(--color-text-secondary);
  gap: 1.5rem;
  width: 100%;
  height: 4rem;
`;

interface Props {
  onClose: () => void;
}

function ScrollableChats(props: Props) {
  const { chatId } = useParams<{ chatId: string }>();
  const { onClose } = props;

  const { selectedMessages } = useSelectedMessages({ chatId });

  const chats = useAppSelector((state) => state.chats.chats);
  const messages = chatId
    ? getChatByID({ chatID: chatId, chats })?.messages
    : undefined;

  const { handleSendMessage } = useMessageSender();

  const handleSubmit = (chatId: string) => {
    const messagesToForward = messages?.filter((message) =>
      selectedMessages?.includes(message._id)
    );

    messagesToForward?.map((message) => {
      handleSendMessage(message.content, chatId);
    });

    onClose();
  };

  console.log("chats = ", chats);

  //TODO: refactor
  return (
    <OuterContainer>
      <HeaderRow>
        <IconWrapper onClick={onClose} test-id="close-icon">
          <Icon>{getIcon("Close")}</Icon>
        </IconWrapper>
        <Heading as="h4">Forward To...</Heading>
      </HeaderRow>
      <ScrollContainer>
        {chats?.map((chat) => (
          <ChatItem
            chat={chat}
            key={chat._id}
            onClick={() => handleSubmit(chat._id)}
          />
        ))}
      </ScrollContainer>
    </OuterContainer>
  );
}

export default ScrollableChats;
