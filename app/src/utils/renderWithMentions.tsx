import styled from "styled-components";


const HighlightedMention = styled.span`
  font-weight: bolder;
  cursor: pointer;
`;

function RenderWithMention(content: string) {
  // Regex to match the mention pattern
  const mentionRegex = /@\[[^\]]+\]\(([^)]+)\)/g;

  // Splitting content into text and mentions
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    // Push the text before the mention
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    // Push the mention as a span element
    parts.push(
      <HighlightedMention color="green" key={match[1]}>
        @{match[1]}
      </HighlightedMention>
    );

    // Update the lastIndex
    lastIndex = mentionRegex.lastIndex;
  }

  // Push the remaining text after the last mention
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <>{parts}</>;
}

export default RenderWithMention;
