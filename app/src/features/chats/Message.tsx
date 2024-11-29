import styled from "styled-components";

import useScrollToLastMsg from "./hooks/useScrollToLastMsg";
import { MessageInterface } from "types/messages";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import useScrollToSearchResultsMsg from "@features/search/hooks/useScrollToSearchResultsMsg";
import { useEffect, useRef } from "react";
import renderWithHighlight from "utils/renderWithHighlight";

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
  z-index: 1000;
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
  const { searchTerm, searchResults, currentResultIndex } = useSelector(
    (state: RootState) => state.search
  );

  const mergedRef = useRef<HTMLDivElement>(null);
  const { lastMessageRef } = useScrollToLastMsg();
  const { searchResultRef } = useScrollToSearchResultsMsg();

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

  return (
    <StyledMessage ref={mergedRef} key={id} $isMine={senderId === userId}>
      <Bubble $isMine={senderId === userId}>
        {renderWithHighlight(content, searchTerm, searchResults, id)}
      </Bubble>
    </StyledMessage>
  );
}

export default Message;
