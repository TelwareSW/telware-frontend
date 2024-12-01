import { allChats } from "@mocks/data/chats";
import { ScrollContainer } from "styles/GlobalStyles";
import styled from "styled-components";
import ChatPopupItem, { ChatPopupItemProps } from "./chatPopupItem";
import Heading from "@components/Heading";
import Icon from "@components/Icon";
import { getIcon } from "@data/icons";
import { useMessageSender } from "@features/chats/hooks/useMessageSender";
import { useAppSelector } from "@hooks/useGlobalState";

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

const StylingWrapper = styled.div`
  width: 100%;
`;

interface Props {
  onClose: () => void;
}

function ScrollableChats(props: Props) {
  const { onClose } = props;
  const selectedMessages = useAppSelector(
    (state) => state.messages.selectedMessages
  );
  const messages = useAppSelector((state) => state.messages.messages);
  const { handleSendMessage } = useMessageSender();

  const handleSubmit = () => {
    const messagesToForward = messages.filter((message) =>
      selectedMessages.includes(message.id)
    );

    messagesToForward.map((message) => {
      handleSendMessage(message.content);
    });

    onClose();
  };

  return (
    <OuterContainer>
      <HeaderRow>
        <IconWrapper onClick={onClose} test-id="close-icon">
          <Icon>{getIcon("Close")}</Icon>
        </IconWrapper>
        <Heading as="h4">Forward To...</Heading>
      </HeaderRow>
      <ScrollContainer>
        {allChats?.map((item) => {
          const data: ChatPopupItemProps = {
            id: item.id.toString(),
            name: item.name,
            username: item.name.toLowerCase() + 123,
          };
          return (
            <StylingWrapper
              onClick={() => handleSubmit()}
              key={data.id}
              data-testid={`user-${data.id}`}
            >
              <ChatPopupItem {...data} />
            </StylingWrapper>
          );
        })}
      </ScrollContainer>
    </OuterContainer>
  );
}

export default ScrollableChats;
