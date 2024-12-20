import styled from "styled-components";

import Message from "./Message";
import { useInView } from "@features/stories/hooks/useInView";
import { useEffect, useRef } from "react";
import { useFetchNextPage } from "./hooks/useFetchNextPage";
import { getChatByID } from "./utils/helpers";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";
import MessageProvider from "./contexts/MessageProvider";

const ScrollContainer = styled.div`
  width: 100%;
  height: 82dvh;
  overflow-y: auto;
  position: relative;
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
  const chat = getChatByID({ chats: chats, chatID: chatId! });

  const { fetchNextPage, hasNextPage } = useFetchNextPage();

  const { inView, ref } = useInView({ threshold: 0.01 });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <div ref={ref}></div>

      {chat?.messages.map((data) => {
        return (
          <MessageProvider
            key={data._id}
            data={data}
            chatType={chat?.type}
            sender={members.find((member) => member._id === data.senderId)}
            numberOfMembers={chat?.numberOfMembers}
          >
            <Message key={data._id} />
          </MessageProvider>
        );
      })}
    </ScrollContainer>
  );
}

export default ChatBody;
