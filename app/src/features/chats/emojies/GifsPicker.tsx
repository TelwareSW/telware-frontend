import styled from "styled-components";
import { useGifs, useTrendingGifs } from "../hooks/useGIFS";

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void;
  searchQuery?: string;
}
interface Gif {
  id: string;
  images: any;
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GifGrid = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 2px;
`;

const GifItem = styled.img`
  width: 90px;
  height: 90px;
  object-fit: fill !important;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const GifPicker = (props: GifPickerProps) => {
  const { onGifSelect, searchQuery } = props;
  const { gifs, isLoading } = useGifs(searchQuery || "");
  const { trendingGifs } = useTrendingGifs();
  return (
    <Container>
      {isLoading ? (
        <GifGrid>
          {gifs?.map((gif: Gif) => (
            <GifItem
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => onGifSelect(gif.images.fixed_height.url)}
              data-testid={`gif-item-${gif.id}`}
            />
          ))}
        </GifGrid>
      ) : (
        <GifGrid>
          {trendingGifs?.map((gif: Gif) => (
            <GifItem
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => onGifSelect(gif.images.fixed_height.url)}
              data-testid={`gif-item-${gif.id}`}
            />
          ))}
        </GifGrid>
      )}
    </Container>
  );
};

export default GifPicker;
