import styled from "styled-components";

import CheckBox from "@features/forward/checkBox";
import MessageOptionList from "./MessageOptionList";
import useScrollToSearchResultsMsg from "@features/search/hooks/useScrollToSearchResultsMsg";
import MessageContent from "./MessageContent";
import useCheckBox from "@features/forward/hooks/useCheckBox";
import MessageDetails from "./MessageDetails";

import useScrollToLastMsg from "./hooks/useScrollToLastMsg";
import useHover from "./hooks/useHover";
import { useMessageContext } from "./contexts/MessageProvider";
import React from "react";
import CommentBox from "./CommentBox";

const StyledMessage = styled.div<{ $isMine: boolean }>`
  display: flex;
  align-items: flex-end;
  margin: 5px 0;
  width: 100%;
  ${({ $isMine }) =>
    $isMine ? "justify-content: flex-end;" : "justify-content: flex-start;"}

  &.highlight {
    background-color: var(--color-chat-hover);
    transition: background-color 0.5s ease;
  }
`;

const Bubble = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: column;

  max-width: 70%;
  padding: 10px;
  border-radius: var(--border-radius-messages);
  font-size: 14px;
  height: fit-content;
  position: relative;

  background: ${({ $isMine }) =>
    $isMine
      ? "linear-gradient(to bottom, var(--color-background-own-1), var(--color-background-own-2), var(--color-background-own-3), var(--color-background-own-4))"
      : "var(--color-background)"};

  background-attachment: ${({ $isMine }) => ($isMine ? "fixed" : "initial")};
  background-size: ${({ $isMine }) => ($isMine ? "cover" : "initial")};
  background-position: ${({ $isMine }) => ($isMine ? "center" : "initial")};

  color: ${({ $isMine }) => ($isMine ? "#fff" : "var(--color-text)")};
  margin: ${({ $isMine }) => ($isMine ? "0 0 0 10px" : "0 10px 0 0")};

  word-break: break-word;
  white-space: pre-wrap;
`;

const MessageRow = styled.div<{ $isChecked: boolean }>`
  display: flex;
  gap: 2rem;
  align-content: center;
  justify-content: start;

  background-color: ${({ $isChecked }) =>
    $isChecked ? `var(--color-chat-hover)` : "none"};

  width: 100%;
`;

const CheckBoxWrapper = styled.div`
  padding-left: 1rem;
  align-self: center;
`;

const Message = React.memo(() => {
  const { _id: id, chatId, isMine, chatType } = useMessageContext();

  useScrollToSearchResultsMsg();

  const { isChecked, toggleCheckBox, showCheckBox } = useCheckBox({
    chatId,
    messageId: id,
  });
  const { isHovered, handleMouseLeave, handleOpenList } = useHover();

  return (
    <MessageRow $isChecked={isChecked}>
      {showCheckBox && (
        <CheckBoxWrapper>
          <CheckBox id={id} isChecked={isChecked} onChange={toggleCheckBox} />
        </CheckBoxWrapper>
      )}

      <StyledMessage
        key={id}
        $isMine={chatType === "channel" ? false : isMine}
        data-message-id={id}
        data-testid={`message-${id}`}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleOpenList}
      >
        <Bubble $isMine={chatType === "channel" ? false : isMine}>
          <MessageContent />
          {isHovered && <MessageOptionList />}
          <MessageDetails />
          {chatType === "channel" && <CommentBox />}
        </Bubble>
      </StyledMessage>
    </MessageRow>
  );
});

export default Message;
