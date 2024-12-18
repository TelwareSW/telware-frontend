import React, { useState, useEffect } from "react";
import { useEncryptDecrypt } from "@features/chats/hooks/useDecrypt";
import styled from "styled-components";

const HighlightedText = styled.span<{ $highlight?: boolean }>`
  background-color: ${(props) => (props.$highlight ? "yellow" : "transparent")};
  color: ${(props) => (props.$highlight ? "black" : "inherit")};
`;

function RenderWithHighlight({
  content,
  searchTerm,
  searchResults,
  id,
  chatId,
}: {
  content: string;
  searchTerm?: string;
  searchResults?: Array<{ messageId: string; highlightIndex: number }>;
  id?: string;
  chatId?: string;
}) {
  const [decryptedContent, setDecryptedContent] = useState<string>(content);
  const { decrypt } = useEncryptDecrypt();

  useEffect(() => {
    const decryptMessage = async () => {
      try {
        const decrypted = await decrypt({ message: content, id: chatId });
        typeof decrypted === "string" && setDecryptedContent(decrypted);
      } catch (error) {
        // Fallback to original content if decryption fails

        setDecryptedContent(content);
      }
    };

    decryptMessage();
  }, [content, decrypt]);

  if (!searchTerm) {
    return <span>{decryptedContent}</span>;
  }

  const result = searchResults?.find((result) => result.messageId === id);

  if (!result) {
    return <span>{decryptedContent}</span>;
  }

  const before = decryptedContent.slice(0, result.highlightIndex);
  const highlighted = decryptedContent.slice(
    result.highlightIndex,
    result.highlightIndex + searchTerm.length
  );
  const after = decryptedContent.slice(
    result.highlightIndex + searchTerm.length
  );

  return (
    <span>
      {before}
      <HighlightedText $highlight>{highlighted}</HighlightedText>
      {after}
    </span>
  );
}

export default RenderWithHighlight;
