import React, { useState } from "react";
import { useAppSelector } from "@hooks/useGlobalState";
import { Theme } from "@state/theme/theme";
import EmojiPicker, {
  EmojiClickData,
  Theme as emojitheme,
} from "emoji-picker-react";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import { StickerTap } from "types/messages";
import GridPicker from "./GridPicker";
import { useStickers } from "../hooks/useStickers";
import { useGifs } from "../hooks/useGIFS";
const Container = styled.div`
  z-index: 4;
  position: absolute;
  width: 30%;
  min-width: 300px;
  height: 50%;
  min-height: 500px;
  max-height: 600px;
  bottom: 105%;
  background: var(--color-background);
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 0;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e6e6e6;
  background: var(--color-secondary);
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  background: ${({ $active }) =>
    $active ? "var(--color-item-active)" : "var(--color-background)"};
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--color-item-active);
  }
`;

const EmojiWrapper = styled.div`
  height: 90%;
  .emoji-picker {
    background: none;
    border: none;
  }
  .epr-body {
    &::-webkit-scrollbar {
      display: block;
      width: 0.4rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-color);
      border-radius: 1rem;
    }
  }
`;

interface PickerProps {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  onSendGIF: (gifUrl: string) => void;
  onSendSticker: (stickerUrl: string) => void;
}

function Picker(props: PickerProps) {
  const { setInputText, onSendGIF, onSendSticker } = props;
  const currentTheme = useAppSelector((state) => state.theme.value);
  const [activeTab, setActiveTab] = useState<StickerTap>(StickerTap.gif);

  const handleEmojiClicked = (emojiData: EmojiClickData) => {
    setInputText((text) => text + emojiData.emoji);
  };

  const handleGIFSelect = (gifUrl: string) => {
    onSendGIF(gifUrl);
  };

  const handleStickerSelect = (stickerUrl: string) => {
    onSendSticker(stickerUrl);
  };

  return (
    <Container>
      <TabBar>
        <Tab
          $active={activeTab === StickerTap.emoji}
          onClick={() => setActiveTab(StickerTap.emoji)}
        >
          {getIcon("EmojiBox")}
        </Tab>
        <Tab
          $active={activeTab === StickerTap.gif}
          onClick={() => setActiveTab(StickerTap.gif)}
        >
          {getIcon("GifBox")}
        </Tab>
        <Tab
          $active={activeTab === StickerTap.sticker}
          onClick={() => setActiveTab(StickerTap.sticker)}
        >
          {getIcon("StickerBox")}
        </Tab>
      </TabBar>
      <EmojiWrapper>
        {activeTab === StickerTap.emoji && (
          <EmojiPicker
            width="100%"
            theme={
              currentTheme === Theme.DARK ? emojitheme.DARK : emojitheme.LIGHT
            }
            onEmojiClick={handleEmojiClicked}
            lazyLoadEmojis={true}
          />
        )}
        {activeTab === StickerTap.gif && (
          <GridPicker onItemSelect={handleGIFSelect} onMount={useGifs} />
        )}
        {activeTab === StickerTap.sticker && (
          <GridPicker
            onItemSelect={handleStickerSelect}
            onMount={useStickers}
          />
        )}
      </EmojiWrapper>
    </Container>
  );
}

export default Picker;
