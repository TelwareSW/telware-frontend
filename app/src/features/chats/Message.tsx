import { useEffect, useRef } from "react";
import styled from "styled-components";

import { MessageInterface } from "types/messages";

import { getIcon } from "@data/icons";

import CheckBox from "@features/forward/checkBox";
import MessageOptionList from "./MessageOptionList";
import useScrollToSearchResultsMsg from "@features/search/hooks/useScrollToSearchResultsMsg";

import renderWithHighlight from "@utils/renderWithHighlight";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import useScrollToLastMsg from "./hooks/useScrollToLastMsg";
import MessageBox from "./MessageBox";
import useCheckBox from "@features/forward/hooks/useCheckBox";
import useHover from "./hooks/useHover";
import useOptionListAction from "./hooks/useOptionListAction";
import FileViewer from "./media/FileViewer";
import {
  pinMessage,
  setShowCheckBox,
  unpinMessage,
} from "@state/messages/chats";
import { useSocket } from "@hooks/useSocket";

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
  z-index: 1;

  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text !important;
  cursor: text;

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

const MessageBoxWrapper = styled.div`
  display: block;
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimeStamp = styled.div<{ $isMine: boolean }>`
  font-size: x-small;
  font-size: x-small;
  color: ${({ $isMine }) =>
    $isMine ? "var(--color-text)" : "var(--color-text-secondary)"};

  float: none;
  display: block;

  float: none;
  display: block;
`;

const Details = styled.div`
  display: flex;
  align-self: flex-end;

  gap: 0.2rem;
`;

type MessageProps = {
  index: number;
  messagesLength: number;
  data: MessageInterface;
};

function Message({
  index,
  messagesLength,
  data: {
    _id: id,
    senderId,
    content,
    isPinned,
    chatId,
    parentMessageId,
    media,
  },
}: MessageProps) {
  const { searchTerm, searchResults, currentResultIndex } = useAppSelector(
    (state) => state.search
  );

  const mergedRef = useRef<HTMLDivElement>(null);
  const { lastMessageRef } = useScrollToLastMsg();
  const { searchResultRef } = useScrollToSearchResultsMsg();

  const { pinMessage: pinMessageSocket, unpinMessage: unpinMessageSocket } =
    useSocket();

  // TODO: make merge ref util
  useEffect(() => {
    lastMessageRef.current =
      index === messagesLength - 1 ? mergedRef.current : null;
    const isSearchResult = searchResults.find(
      (result) => result.messageId === id
    );
    const isCurrentResult =
      isSearchResult && searchResults[currentResultIndex]?.messageId === id;

    searchResultRef.current = isCurrentResult ? mergedRef.current : null;
  }, [
    searchResults,
    currentResultIndex,
    searchTerm,
    id,
    index,
    messagesLength,
    lastMessageRef,
    searchResultRef,
  ]);

  const { isChecked, toggleCheckBox, showCheckBox } = useCheckBox({
    chatId,
    messageId: id,
  });
  const { isHovered, handleMouseLeave, handleOpenList } = useHover();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const { handleEditMessage, handleReply, MoveToReplyMessage } =
    useOptionListAction({ id, content, parentMessageId });
  const dispatch = useAppDispatch();

  function pinOnClick() {
    if (isPinned) {
      dispatch(unpinMessage({ messageId: id, chatId: chatId }));
      unpinMessageSocket(chatId, id, userId);
      return;
    }
    dispatch(pinMessage({ messageId: id, chatId: chatId }));
    pinMessageSocket(chatId, id, userId);
  }

  function forwardOnClick() {
    dispatch(setShowCheckBox({ chatId: chatId, showCheckBox: !showCheckBox }));
  }

  return (
    <MessageRow $isChecked={isChecked}>
      {showCheckBox && (
        <CheckBoxWrapper>
          <CheckBox id={id} isChecked={isChecked} onChange={toggleCheckBox} />
        </CheckBoxWrapper>
      )}

      <StyledMessage
        ref={mergedRef}
        key={id}
        $isMine={senderId === userId}
        data-message-id={id}
        data-testid={`message-${id}`}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleOpenList}
      >
        <Bubble $isMine={senderId === userId}>
          <StyledCol>
            {parentMessageId && (
              <MessageBoxWrapper
                onClick={MoveToReplyMessage}
                test-id={`reply-box-${id}`}
              >
                <MessageBox messageId={parentMessageId} />
              </MessageBoxWrapper>
            )}
            {media && <FileViewer file={media} />}
            {renderWithHighlight(content, searchTerm, searchResults, id)}
          </StyledCol>

          {isHovered && (
            <MessageOptionList
              $isMine={senderId === userId}
              forwardOnClick={forwardOnClick}
              isPinned={isPinned}
              pinOnClick={pinOnClick}
              replyOnClick={handleReply}
              editOnClick={handleEditMessage}
            />
          )}
          <Details>
            {isPinned && getIcon("PushPin")}
            <TimeStamp $isMine={senderId === userId}>11:09AM</TimeStamp>
          </Details>
        </Bubble>
      </StyledMessage>
    </MessageRow>
  );
}

export default Message;
