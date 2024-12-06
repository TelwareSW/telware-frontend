import React, { useState, useMemo } from "react";
import styled from "styled-components";
import PinnedMessageProgressBar from "./PinnedMessageProgressBar";
import { useAppSelector } from "@hooks/useGlobalState";
import { getChatByID } from "@features/chats/helpers";
import { useParams } from "react-router-dom";
import { MessageInterface } from "types/messages";

const PinnedMessagesContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 250px;
  padding: 0.1rem;
  margin: 0.2rem;
  border-radius: 0.3rem;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

const PinnedMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const PinnedMessageTitle = styled.div`
  font-size: 0.875rem;
  color: var(--accent-color);
  font-weight: 600;
`;

const PinnedMessagePreview = styled.div`
  font-size: 0.75rem;
  color: var(--color-text);
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PinnedMessages: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const chats = useAppSelector((state) => state.chats.chats);
  const chat = chatId && getChatByID({ chatID: chatId, chats });

  let pinnedMessages: MessageInterface[] = [];
  if (chat)
    pinnedMessages = chat.messages.filter((message) => message.isPinned);

  const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0);

  const currentPinnedMessage = useMemo(() => {
    return pinnedMessages[currentPinnedIndex];
  }, [pinnedMessages, currentPinnedIndex]);

  const handleNextPinnedMessage = () => {
    if (pinnedMessages.length > 0) {
      setCurrentPinnedIndex(
        (prevIndex) => (prevIndex + 1) % pinnedMessages.length,
      );
      document
        .querySelector("[data-message-id='" + currentPinnedMessage?._id + "']")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  };

  if (pinnedMessages.length === 0) return null;

  return (
    <PinnedMessagesContainer
      onClick={handleNextPinnedMessage}
      data-testid="pinned-messages-container"
    >
      <PinnedMessageProgressBar
        pinnedMessages={pinnedMessages}
        currentPinnedIndex={currentPinnedIndex}
      />

      <PinnedMessageContent>
        <PinnedMessageTitle data-testid="pinned-message-title">
          Pinned Message {currentPinnedIndex + 1}
        </PinnedMessageTitle>

        <PinnedMessagePreview data-testid="pinned-message-preview">
          {currentPinnedMessage?.content}
        </PinnedMessagePreview>
      </PinnedMessageContent>
    </PinnedMessagesContainer>
  );
};

export default PinnedMessages;
