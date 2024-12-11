import { useAppSelector } from "@hooks/useGlobalState";
import { RootState } from "@state/store";
import styled from "styled-components";
import { MessageInterface } from "types/messages";
import { useParams } from "react-router-dom";
import { getChatByID } from "./utils/helpers";

interface MessageBoxProps {
  messageId?: string | null;
}

const State = styled.div<{ $colorIndex: number }>`
  color: var(--color-peer-${({ $colorIndex }) => $colorIndex});
  text-transform: capitalize;
`;

const Message = styled.div`
  font-size: smaller;
  color: var(--color-text);
  opacity: 0.9;
`;

const StyledMessageBox = styled.div<{ $colorIndex: number }>`
  line-height: 1rem;

  color: var(--color-peer-${({ $colorIndex }) => $colorIndex});
  background-color: var(--color-peer-bg-${({ $colorIndex }) => $colorIndex});

  position: relative;
  flex: 1 1;

  border-left: var(--color-peer-${({ $colorIndex }) => $colorIndex}) 3px solid;
  border-radius: 5px;

  padding: 7px 0.5rem;

  &:hover {
    background-color: var(
      --color-peer-bg-active ${({ $colorIndex }) => $colorIndex}
    );
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 1px;
    height: 100%;

    background-color: var(--color-peer-${({ $colorIndex }) => $colorIndex});
  }
`;

function getMessageById(
  messageId: string,
  messages?: MessageInterface[]
): MessageInterface | undefined {
  return messages
    ? messages.find((message) => message._id === messageId)
    : undefined;
}

function MessageBox({ messageId }: MessageBoxProps) {
  const id = useAppSelector((state) => state.user.userInfo.id);
  const { chats, members } = useAppSelector((state) => state.chats);

  const { chatId } = useParams<{ chatId: string }>();

  const messages = chatId
    ? getChatByID({ chats: chats, chatID: chatId })?.messages
    : undefined;

  let msg: MessageInterface | undefined;
  let name: string | undefined;

  // TODO: refactor this
  if (messageId) {
    msg = getMessageById(messageId, messages);
    if (id === msg?.senderId) name = "you";
    else {
      const sender = members.find((member) => member._id === msg?.senderId);
      name = `${sender?.screenFirstName} ${sender?.screenLastName}`;
    }
  }

  const memberIndex = members.findIndex(
    (member) => member._id === msg?.senderId
  );
  const colorIndex = memberIndex >= 0 ? (memberIndex % 5) + 2 : 2;

  const activeMessage = useAppSelector(
    (state: RootState) => state.activeMessage
  );

  return (
    <StyledMessageBox $colorIndex={colorIndex}>
      <State $colorIndex={colorIndex}>
        {name ? name : `${activeMessage.state}ing`}
      </State>
      <Message>{msg ? msg.content : activeMessage.content}</Message>
    </StyledMessageBox>
  );
}

export default MessageBox;
