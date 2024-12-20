import styled from "styled-components";

import { useMessageContext } from "./contexts/MessageProvider";
import { getIcon } from "@data/icons";

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
`;

const CommentsText = styled.div`
  font-size: 0.8rem;
`;

const CommentsIcon = styled.div``;

function CommentBox() {
  const { threadMessages } = useMessageContext();

  return (
    <Container>
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
