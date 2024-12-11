import styled from "styled-components";

import Message from "./Message";
import { useInView } from "@features/stories/hooks/useInView";
import { useEffect, useRef } from "react";
import { useFetchNextPage } from "./hooks/useFetchNextPage";
import { getChatByID } from "./utils/helpers";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";

const ScrollContainer = styled.div`
  width: 100%;
  height: 87dvh;
  overflow-y: auto;
  position: relative;

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
  const chats = useAppSelector((state) => state.chats.chats);

  const messages =
    chatId &&
    getChatByID({
      chats: chats,
      chatID: chatId,
    })?.messages;

  const { fetchNextPage } = useFetchNextPage();

  const { inView, ref } = useInView({ threshold: 0.01 });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView) {
      const container = scrollContainerRef.current;
      if (!container) return;

      const previousScrollHeight = container.scrollHeight;
      const previousScrollTop = container.scrollTop;

      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop =
            previousScrollTop + (newScrollHeight - previousScrollHeight);
        }, 0);
      });
    }
  }, [fetchNextPage, inView]);

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <div ref={ref}></div>
      {messages &&
        messages.map((data) => <Message key={data._id} data={data} />)}
    </ScrollContainer>
  );
}

export default ChatBody;
