import React, { useEffect, useState } from "react";
import { useAppSelector } from "@hooks/useGlobalState";
import { Theme } from "@state/theme/theme";
import EmojiPicker, {
  EmojiClickData,
  Theme as emojitheme,
} from "emoji-picker-react";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import { StickerTap } from "types/messages";
import { useTrendingGifs } from "../hooks/useGIFS";
import GifPicker from "./GifsPicker";
import { SearchOutlined } from "@mui/icons-material";

const Container = styled.div`
  z-index: 4;
  position: absolute;
  width: 30%;
  min-width: 300px;
  height: 50%;
  min-height: 400px;
  max-height: 500px;
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

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  background: ${({ active }) =>
    active ? "var(--color-item-active)" : "var(--color-background)"};
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
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
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;
const StyledSearchBar = styled.div`
  margin-left: 1rem;
  position: relative;
  width: 100%;

  &:focus-within > svg {
    color: var(--color-search-border);
  }
`;

const StyledSearchIcon = styled(SearchOutlined)`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  background-color: var(--color-chat-hover);
  border: 1px solid var(--pattern-color);
  border-radius: var(--border-radius-searchbar);
  color: var(--color-text);
  font-size: 1rem;
  padding: 0.525rem 0 0.525rem 2.5rem;
  outline: solid 1px transparent;
  width: 100%;

  &:focus {
    border-color: var(--color-search-border);
    outline-color: var(--color-search-border);
    caret-color: var(--color-search-border);
  }
  &::placeholder {
    color: var(--color-text-secondary);
  }
`;
interface PickerProps {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  sendGIF: (gifUrl: string) => void;
  sendSticker: (stickerUrl: string) => void;
}

export default function Picker({
  setInputText,
  sendGIF,
  sendSticker,
}: PickerProps) {
  const { trendingGifs } = useTrendingGifs();
  const currentTheme = useAppSelector((state) => state.theme.value);
  const [activeTab, setActiveTab] = useState<StickerTap>(StickerTap.emoji);
  const [gifs, setGifs] = useState<string[]>(trendingGifs);
  const [gifSearch, setGifSearch] = useState("");
  const [stickers] = useState<string[]>([
    // Replace these placeholders with sticker URLs
    "https://example.com/sticker1.png",
    "https://example.com/sticker2.png",
  ]);

  const handleEmojiClicked = (emojiData: EmojiClickData) => {
    setInputText((text) => text + emojiData.emoji);
  };

  const handleGIFSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGifSearch(e.target.value);
  };

  const handleGIFSelect = (gifUrl: string) => {
    sendGIF(gifUrl);
  };

  const handleStickerSelect = (stickerUrl: string) => {
    sendSticker(stickerUrl);
  };

  return (
    <Container>
      <TabBar>
        <Tab
          active={activeTab === StickerTap.emoji}
          onClick={() => setActiveTab(StickerTap.emoji)}
        >
          {getIcon("EmojiBox")}
        </Tab>
        <Tab
          active={activeTab === StickerTap.gif}
          onClick={() => setActiveTab(StickerTap.gif)}
        >
          {getIcon("GifBox")}
        </Tab>
        <Tab
          active={activeTab === StickerTap.sticker}
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
          <Wrapper className="hi">
            <StyledSearchBar>
              <SearchInput
                type="text"
                placeholder="Search"
                onChange={handleGIFSearch}
                value={gifSearch}
                data-testid="gifs-search"
              />
              <StyledSearchIcon />
            </StyledSearchBar>
            <GifPicker
              searchQuery={gifSearch}
              onGifSelect={(id) => console.log(id)}
            />
          </Wrapper>
        )}
        {activeTab === StickerTap.sticker && (
          <Wrapper>
            {stickers?.map((sticker, index) => (
              <img
                key={index}
                src={sticker}
                alt={`sticker-${index}`}
                onClick={() => handleStickerSelect(sticker)}
              />
            ))}
          </Wrapper>
        )}
      </EmojiWrapper>
    </Container>
  );
}
