import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "@state/store";
import Message from "./Message";
import { useInView } from "@features/stories/hooks/useInView";
import { useEffect } from "react";
import { useFetchNextPage } from "./hooks/useFetchNextPage";

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
  const messages = useSelector((state: RootState) => state.messages.messages);

  const { fetchNextPage, data } = useFetchNextPage();

  const { inView, ref } = useInView();

  useEffect(() => {
    console.log(inView);
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log(data?.pages);

  //TODO: fix the ordering of pages and message within each page
  //TODO: fix new page scroll to the top most message
  return (
    <>
      <ScrollContainer>
      <div ref={ref}></div>
        {data?.pages
          .slice()
          .reverse()
          .flatMap((page) => page.messages)
          .map((data, index) => {
            return (
              <Message
                key={index}
                index={index}
                messagesLength={messages.length}
                data={data}
              />
            );
          })}
      </ScrollContainer>
    </>
  );
}

export default ChatBody;
