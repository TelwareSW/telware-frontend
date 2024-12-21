import styled from "styled-components";

import Message from "./Message";
import { useInView } from "@features/stories/hooks/useInView";
import { useEffect, useRef } from "react";
import { useFetchNextPage } from "./hooks/useFetchNextPage";
import { getChatByID } from "./utils/helpers";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";
import MessageProvider from "./contexts/MessageProvider";
import { getIcon } from "@data/icons";
import useTraversalMentions from "./hooks/useTraverseMentions";
import Icon from "@components/Icon";

const ScrollContainer = styled.div`
  width: 100%;
  height: 82dvh;
  overflow-y: auto;
  margin-top: 3rem;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: inherit;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-color);
    border-radius: 5px;
  }

  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

function ChatBody() {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats, members } = useAppSelector((state) => state.chats);
  const { activeThread } = useAppSelector((state) => state.channelsThreads);
  const chat = getChatByID({ chats: chats, chatID: chatId! });

  const { fetchNextPage, hasNextPage } = useFetchNextPage();

  const { inView, ref } = useInView({ threshold: 0.01 });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { handleNextMentionMessage, mentionMessages } = useTraversalMentions();


  useEffect(() => {
    if (inView && hasNextPage && chatId) {
      const container = scrollContainerRef.current;
      if (!container) return;

      const previousScrollHeight = container.scrollHeight;
      const previousScrollTop = container.scrollTop;

      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop =
            previousScrollTop + (newScrollHeight - previousScrollHeight);
        });
      });
    }
  }, [fetchNextPage, inView, chatId]);

  const messages = chat?.messages?.filter((msg) => !msg.parentMessageId);
  const threadMessages = activeThread
    ? chat?.messages.filter((msg) => msg.parentMessageId === activeThread)
    : [];

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <div ref={ref}></div>

      {!activeThread &&
        messages?.map((data) => {
          return (
            <MessageProvider
              key={data._id}
              data={data}
              chatType={chat?.type as "private" | "group" | "channel"}
              sender={members.find((member) => member._id === data.senderId)}
              numberOfMembers={chat?.numberOfMembers}
              isAppropriate={data.isAppropriate}
            >
              <Message key={data._id} />
            </MessageProvider>
          );
        })}

      {activeThread &&
        threadMessages?.map((data) => {
          return (
            <MessageProvider
              key={data._id}
              data={data}
              chatType="channel"
              sender={members.find((member) => member._id === data.senderId)}
              numberOfMembers={chat?.numberOfMembers}
              isAppropriate={data.isAppropriate}
            >
              <Message key={data._id} />
            </MessageProvider>
          );
        })}
      <Icon onClick={handleNextMentionMessage} data-testid="mention-icon">
        {mentionMessages.length > 0 &&
          getIcon("Mention", {
            sx: {
              fontSize: "2.5rem",
              color: "var(--accent-color)",
              backgroundColor: `var(--color-background)`,
              borderRadius: "50%",
              position: "absolute",
              bottom: "8rem",
              right: "3%",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "var(--color-background-own-1)",
                color: "white",
                transition: "0.2s",
              },
            },
          })}
      </Icon>
    </ScrollContainer>
  );
}

export default ChatBody;
