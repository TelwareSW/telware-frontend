import Icon from "@components/Icon";
import { getIcon } from "@data/icons";
import { getChatByID } from "@features/chats/utils/helpers";
import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--color-background);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex: 2 2;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
`;

const StyledHeader = styled.div`
  font-size: 1rem;
  color: var(--color-text-secondary);
  flex: 1;
  text-align: center;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface Props {
  onClose: () => void;
  onForward: () => void;
}

function ForwardingInputBar(props: Props) {
  const { chatId } = useParams<{ chatId: string }>();

  const { onClose, onForward } = props;

  const chats = useAppSelector((state) => state.chats.chats);
  const chat = chatId ? getChatByID({ chatID: chatId, chats }) : undefined;

  const selectedMessages = chat?.selectedMessages;

  return selectedMessages ? (
    <Wrapper>
      <IconButton onClick={onClose} test-id="close-icon">
        <Icon>{getIcon("Close")}</Icon>
      </IconButton>
      <StyledHeader>{selectedMessages.length} messages selected</StyledHeader>
      <IconButton onClick={onForward} test-id="forward-icon">
        <Icon>{getIcon("Forward")}</Icon>
      </IconButton>
    </Wrapper>
  ) : (
    <></>
  );
}

export default ForwardingInputBar;
