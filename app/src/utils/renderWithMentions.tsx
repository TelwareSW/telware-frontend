import { setIsMention } from "@state/messages/chats";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const HighlightedMention = styled.span`
  font-weight: bolder;
  cursor: pointer;
`;

function RenderWithMention(content: string, messageId: string) {
  const mentionRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
  const { chatId } = useParams<{ chatId: string }>();
  const dispatch = useDispatch();
  const parts = [];
  let lastIndex = 0;
  let match;

  let hasMention = false;
  while (content && (match = mentionRegex.exec(content)) !== null) {
    hasMention = true;

    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    parts.push(
      <HighlightedMention color="green" key={match[1]}>
        @{match[1]}
      </HighlightedMention>
    );

    lastIndex = mentionRegex.lastIndex;
  }

  if (hasMention) {
    dispatch(setIsMention({ chatId: chatId!, isMention: true, messageId }));
  }

  if (content && lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <>{parts}</>;
}

export default RenderWithMention;
