import styled from "styled-components";
import RenderWithMention from "./renderWithMentions";

const HighlightedText = styled.span<{ $highlight?: boolean }>`
  background-color: ${(props) => (props.$highlight ? "yellow" : "transparent")};
  color: ${(props) => (props.$highlight ? "black" : "inherit")};
`;

function RenderWithHighlight(
  content: string,
  searchTerm?: string,
  searchResults?: Array<{ messageId: string; highlightIndex: number }>,
  id?: string
) {
  if (!searchTerm) {
    return RenderWithMention(content, id!);
  }

  const result = searchResults?.find((result) => result.messageId === id);

  if (!result) {
    return RenderWithMention(content, id!);
  }

  const before = content.toString().slice(0, result.highlightIndex);
  const highlighted = content
    .toString()
    .slice(result.highlightIndex, result.highlightIndex + searchTerm.length);
  const after = content
    .toString()
    .slice(result.highlightIndex + searchTerm.length);

  return (
    <span>
      {before}
      <HighlightedText $highlight>{highlighted}</HighlightedText>
      {after}
    </span>
  );
}

export default RenderWithHighlight;
