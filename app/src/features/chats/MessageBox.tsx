import { useAppSelector } from "@hooks/useGlobalState";
import { allChats } from "@mocks/data/chats";
import { RootState } from "@state/store";
import styled from "styled-components";
import { MessageInterface } from "types/messages";

interface MessageBoxProps {
  messageId?: string | null;
}

const State = styled.div`
  color: var(--accent-color);
  text-transform: capitalize;
`;

const Message = styled.div`
  font-size: smaller;
  color: var(--color-text);
  opacity: 0.9;
`;

const StyledMessageBox = styled.div`
  line-height: 1rem;

  background-color: var(--color-background-compact-menu);

  position: relative;
  flex: 1 1;

  border-left: var(--accent-color) 3px solid;
  border-radius: 5px;

  padding: 7px 0.5rem;

  &:hover {
    background-color: var(--color-background-compact-menu-hover);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 1px;
    height: 100%;

    background-color: var(--accent-color);
  }
`;

function extractMessageData(
  messages: MessageInterface[],
  messageId: string,
  id: string
) {
  const msg = getMessageById(messages, messageId);
  let name: string | undefined;

  if (id === msg?.senderId) name = "you";
  else {
    const chat =
      msg && allChats.find((chat) => chat.id.toString() === msg?.senderId);
    name = chat?.name;
  }

  return { msg, name };
}

function getMessageById(
  messages: MessageInterface[],
  messageId: string
): MessageInterface | undefined {
  return messages.find((message) => message.id === messageId);
}

function MessageBox({ messageId }: MessageBoxProps) {
  let id = useAppSelector((state) => state.user.userInfo.id);
  const messages = useAppSelector((state) => state.messages.messages);

  let msg: MessageInterface | undefined;
  let name: string | undefined;

  if (messageId) {
    const data = extractMessageData(messages, messageId, id);
    msg = data.msg;
    name = data.name;
  }

  const activeMessage = useAppSelector(
    (state: RootState) => state.activeMessage
  );

  return (
    <StyledMessageBox>
      <State>{name ? name : `${activeMessage.state}ing`}</State>
      <Message>{msg ? msg.content : activeMessage.content}</Message>
    </StyledMessageBox>
  );
}

export default MessageBox;
