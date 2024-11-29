import styled from "styled-components";

import useScrollToLastMsg from "./hooks/useScrollToLastMsg";
import { MessageInterface } from "types/messages";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";

const StyledMessage = styled.div<{ $isMine: boolean }>`
  display: flex;
  align-items: flex-end;
  margin: 5px 0;

  ${({ $isMine }) =>
    $isMine ? "justify-content: flex-end;" : "justify-content: flex-start;"}
`;

const Bubble = styled.div<{ $isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;

  background-color: ${({ $isMine }) => ($isMine ? "#0084ff" : "#e5e5ea")};
  color: ${({ $isMine }) => ($isMine ? "#fff" : "#000")};
  margin: ${({ $isMine }) => ($isMine ? "0 0 0 10px" : "0 10px 0 0")};
  z-index: 2;
`;

type MessageProps = {
  index: number;
  messagesLength: number;
  data: MessageInterface;
};

function Message({
  index,
  messagesLength,
  data: { id, senderId, content },
}: MessageProps) {
  const { lastMessageRef } = useScrollToLastMsg();

  const userId = useSelector((state: RootState) => state.user.userInfo.id);

  return (
    <StyledMessage
      ref={index === messagesLength - 1 ? lastMessageRef : null}
      key={id}
      $isMine={senderId === userId}
    >
      <Bubble $isMine={senderId === userId}>{content}</Bubble>
    </StyledMessage>
  );
}

export default Message;
