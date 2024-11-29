import React from "react";
import styled from "styled-components";

const HighlightedText = styled.span<{ $highlight?: boolean }>`
  background-color: ${(props) => (props.$highlight ? "yellow" : "transparent")};
  color: ${(props) => (props.$highlight ? "black" : "inherit")};
`;

function renderWithHighlight(
  content: string,
  searchTerm?: string,
  searchResults?: any,
  id?: string,
) {
  if (!searchTerm) {
    return content;
  }

  const result = searchResults.find((result) => result.messageId === id);

  if (!result) {
    return content;
  }

  const before = content.slice(0, result.highlightIndex);
  const highlighted = content.slice(
    result.highlightIndex,
    result.highlightIndex + searchTerm.length,
  );
  const after = content.slice(result.highlightIndex + searchTerm.length);

  return (
    <>
      {before}
      <HighlightedText $highlight>{highlighted}</HighlightedText>
      {after}
    </>
  );
}

export default renderWithHighlight;
