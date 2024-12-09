import styled from "styled-components";

import Message from "./Message";
import { useInView } from "@features/stories/hooks/useInView";
import { useEffect } from "react";
import { useFetchNextPage } from "./hooks/useFetchNextPage";
import { getChatByID } from "./helpers";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";

const ScrollContainer = styled.div`
  width: 100%;
  /* margin-top: 100px; */
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

  scroll-behavior: smooth;

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

  const { inView, ref } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  //TODO: fix the ordering of pages and message within each page
  //TODO: fix new page scroll to the top most message
  return (
    <>
      <ScrollContainer>
        <div ref={ref}></div>

        {messages &&
          messages.map((data) => {
            return <Message key={data._id} data={data} />;
          })}
      </ScrollContainer>
    </>
  );
}

export default ChatBody;
