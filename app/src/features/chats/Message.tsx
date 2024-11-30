import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  setShowCheckBox,
  setIsOptionListOpen,
  SelectMessage,
  removeSelectedMessage,
  pinMessage,
  unpinMessage,
} from "@state/messages/messages";

import { MessageInterface } from "types/messages";
import { RootState } from "@state/store";

import { getIcon } from "@data/icons";

import CheckBox from "@features/forward/checkBox";
import MessageOptionList from "./MessageOptionList";
import useScrollToSearchResultsMsg from "@features/search/hooks/useScrollToSearchResultsMsg";

import renderWithHighlight from "@utils/renderWithHighlight";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import useScrollToLastMsg from "./hooks/useScrollToLastMsg";
import { setActiveMessage } from "@state/messages/activeMessage";
import { useSocket } from "@hooks/useSocket";
import MessageBox from "./MessageBox";

const StyledMessage = styled.div<{ $isMine: boolean }>`
  display: flex;
  align-items: flex-end;
  margin: 5px 0;
  width: 100%;
  ${({ $isMine }) =>
    $isMine ? "justify-content: flex-end;" : "justify-content: flex-start;"}
`;

const Bubble = styled.div<{ $isMine: boolean }>`
  display: flex;
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  height: fit-content;
  position: relative;
  width: max-content;
  background-color: ${({ $isMine }) => ($isMine ? "#0084ff" : "#e5e5ea")};
  color: ${({ $isMine }) => ($isMine ? "#fff" : "#000")};
  margin: ${({ $isMine }) => ($isMine ? "0 0 0 10px" : "0 10px 0 0")};
  z-index: 1;
`;

const StyledIcon = styled.div`
  cursor: pointer;
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
  background-color: var(--color-background);
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
    id,
    senderId,
    content,
    isOptionListOpen,
    isPinned,
    chatId,
    isReply,
    replyMessageId,
  },
}: MessageProps) {
  const { searchTerm, searchResults, currentResultIndex } = useSelector(
    (state: RootState) => state.search
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
    mergedRef.current,
    searchResults,
    currentResultIndex,
    searchTerm,
    id,
    index,
    messagesLength,
  ]);

  const userId = useSelector((state: RootState) => state.user.userInfo.id);

  const showCheckbox = useSelector(
    (state: RootState) => state.messages.showCheckBox
  );
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const showCheckBox = useAppSelector((state) => state.messages.showCheckBox);

  useEffect(() => {
    setIsChecked(isChecked && showCheckBox);
  }, [showCheckBox]);

  function toggleCheckBox() {
    if (!isChecked) {
      dispatch(SelectMessage({ id: id }));
    } else {
      dispatch(removeSelectedMessage({ id: id }));
    }
    setIsChecked(!isChecked);
  }

  function handleIconClick() {
    dispatch(setIsOptionListOpen({ value: !isOptionListOpen, id: id }));
  }

  function pinOnClick() {
    if (isPinned) {
      dispatch(unpinMessage({ messageId: id, chatId: chatId }));
      unpinMessageSocket(id, chatId, userId);
      return;
    }
    dispatch(pinMessage({ messageId: id, chatId: chatId }));
    pinMessageSocket(id, chatId, userId);
  }

  function forwardOnClick() {
    dispatch(setShowCheckBox({ showCheckBox: !showCheckbox }));
    dispatch(setIsOptionListOpen({ value: !isOptionListOpen, id: id }));
  }

  function handleEditMessage() {
    dispatch(setActiveMessage({ id, content, state: "edit" }));
  }

  function handleReply() {
    dispatch(setActiveMessage({ id, content, state: "reply" }));
  }

  function MoveToReplyMessage() {
    document
      .querySelector("[data-message-id='" + replyMessageId + "']")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }

  return (
    <MessageRow $isChecked={isChecked}>
      {showCheckbox && (
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
      >
        <Bubble $isMine={senderId === userId}>
          <StyledCol>
            {isReply && (
              <MessageBoxWrapper onClick={MoveToReplyMessage}>
                <MessageBox messageId={replyMessageId} senderId={senderId} />
              </MessageBoxWrapper>
            )}
            {renderWithHighlight(content, searchTerm, searchResults, id)}
          </StyledCol>

          <StyledIcon onClick={handleIconClick}>
            {getIcon("MessagingOptions")}
          </StyledIcon>
          {isOptionListOpen && (
            <MessageOptionList
              $isMine={senderId === userId}
              forwardOnClick={forwardOnClick}
              isPinned={isPinned}
              pinOnClick={pinOnClick}
              replyOnClick={handleReply}
              editOnClick={handleEditMessage}
            />
          )}
        </Bubble>
      </StyledMessage>
    </MessageRow>
  );
}

export default Message;
