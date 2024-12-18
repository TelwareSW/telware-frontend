import styled from "styled-components";

import MessageBox from "./MessageBox";
import SenderName from "./SenderName";
import FileViewer from "./media/FileViewer";

import RenderWithHighlight from "@utils/renderWithHighlight";

import { useMessageContext } from "./contexts/MessageProvider";

import useOptionListAction from "./hooks/useOptionListAction";
import { useAppSelector } from "@hooks/useGlobalState";

const MessageBoxWrapper = styled.div`
  display: block;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Gif = styled.img`
  width: 120px;
  height: 120px;
  object-fit: fill;
  cursor: pointer;
  border-radius: 0.5rem;
`;

function MessageContent() {
  const {
    _id: id,
    content,
    parentMessageId,
    media,
    contentType,
  } = useMessageContext();

  const { searchTerm, searchResults } = useAppSelector((state) => state.search);
  const { MoveToReplyMessage } = useOptionListAction({
    id,
    content,
    parentMessageId,
  });

  const isGifOrSticker =
    media && (contentType === "GIF" || contentType === "sticker");

  const isFile = media && !(contentType === "GIF" || contentType === "sticker");

  return (
    <Container>
      <SenderName />
      {parentMessageId && (
        <MessageBoxWrapper
          onClick={MoveToReplyMessage}
          test-id={`reply-box-${id}`}
        >
          <MessageBox messageId={parentMessageId} />
        </MessageBoxWrapper>
      )}
      {isGifOrSticker && <Gif src={media} loading="lazy" />}
      {isFile && <FileViewer file={media} />}
      {RenderWithHighlight(content, searchTerm, searchResults, id)}
    </Container>
  );
}

export default MessageContent;
