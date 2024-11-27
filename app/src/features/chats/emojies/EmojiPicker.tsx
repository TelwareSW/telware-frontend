import { useAppSelector } from "@hooks/useGlobalState";
import { Theme } from "@state/theme/theme";
import EmojiPicker, { Theme as emojitheme } from "emoji-picker-react";
import styled from "styled-components";

const StyledEmojiPickerContainer = styled.div`
  width: 30vw;
  height: 35vh;
  max-height: 400px;
  position: absolute;
  z-index: 2000;
  bottom: 10vh;
  left: 10vw;
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

export default function EmojiPickerItem() {
  const currentTheme = useAppSelector((state) => state.theme.value);

  return (
    <StyledEmojiPickerContainer>
      <EmojiPickerWrapper>
        <EmojiPicker
          width="100%"
          theme={
            currentTheme === Theme.DARK ? emojitheme.DARK : emojitheme.LIGHT
          }
        />
      </EmojiPickerWrapper>
    </StyledEmojiPickerContainer>
  );
}
