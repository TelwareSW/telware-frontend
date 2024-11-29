import React from "react";
import { useAppSelector } from "@hooks/useGlobalState";
import { Theme } from "@state/theme/theme";
import EmojiPicker, {
  EmojiClickData,
  Theme as emojitheme,
} from "emoji-picker-react";
import styled from "styled-components";

// Styled components
const StyledEmojiPickerContainer = styled.div`
  z-index: 3;
  position: absolute;
  width: 30%;
  min-width: 300px;
  height: 35%;
  min-height: 400px;
  max-height: 400px;
  bottom: 105%;
  background: var(--color-secondary);
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 0;
`;

const EmojiPickerWrapper = styled.div`
  .emoji-picker {
    background: none;
    border: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    gap: 8px;
  }

  .emoji {
    font-size: 1.2rem;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

interface EmojiPickerItemProps {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiPickerItem({
  setInputText,
}: EmojiPickerItemProps) {
  const currentTheme = useAppSelector((state) => state.theme.value);

  const handleEmojiClicked = (emojiData: EmojiClickData, event: MouseEvent) => {
    setInputText((text) => text + emojiData.emoji);
  };

  return (
    <StyledEmojiPickerContainer>
      <EmojiPickerWrapper>
        <EmojiPicker
          width="100%"
          theme={
            currentTheme === Theme.DARK ? emojitheme.DARK : emojitheme.LIGHT
          }
          onEmojiClick={handleEmojiClicked}
        />
      </EmojiPickerWrapper>
    </StyledEmojiPickerContainer>
  );
}
