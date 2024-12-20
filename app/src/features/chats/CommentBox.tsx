import styled from "styled-components";

import { useMessageContext } from "./contexts/MessageProvider";
import { getIcon } from "@data/icons";
import { useDispatch } from "react-redux";
import { setActiveThread } from "@state/messages/channels";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  border-top: 1px solid rgb(59, 75, 74);
  margin-inline: -8px;
  padding-inline: 0.6rem;
  padding-top: 0.2rem;
  margin-top: 0.5rem;
  color: var(--accent-color);
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 0.5rem 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-chat-hover);
    backdrop-filter: hue-rotate(10deg);
  }
`;

const CommentsText = styled.div`
  font-size: 0.8rem;
`;

const CommentsIcon = styled.div``;

function CommentBox() {
  const { threadMessages, _id: messageId } = useMessageContext();
  const dispatch = useDispatch();

  const handleOpenComments = () => {
    dispatch(setActiveThread({ threadId: messageId, threadMessages }));
  };

  return (
    <Container onClick={handleOpenComments}>
      <CommentsText>{threadMessages?.length} Comments</CommentsText>
      <CommentsIcon>
        {getIcon("RightArrow", {
          sx: { fontSize: "1.8rem", color: "var(--accent-color)" },
        })}
      </CommentsIcon>
    </Container>
  );
}

export default CommentBox;
