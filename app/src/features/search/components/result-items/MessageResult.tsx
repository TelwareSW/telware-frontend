import styled from "styled-components";

import Avatar from "@components/Avatar";
import { isValidDate } from "@utils/helpers";

const ItemWrapper = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
`;

const DateSpan = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

const Message = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
`;

const MediaPreview = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-right: 0.3rem;
`;

const Highlight = styled.span`
  background: #cae3f7;
  color: #000000;
  padding: 0 0.125rem;
  border-radius: 2px;
`;

const LinkPreview = styled.a`
  font-size: 0.875rem;
  color: var(--accent-color);
`;

interface MessageResultProps {
  title: string;
  message: string;
  date: string;
  searchTerm?: string;
  image?: string;
  media?: string;
  link?: string;
}

const MessageResult: React.FC<MessageResultProps> = ({
  title,
  message,
  date,
  searchTerm,
  image,
  media,
  link,
}) => {
  const highlight = (text: string) => {
    if (!searchTerm) return text;
    const split = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return split.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <Highlight key={index}>{part}</Highlight>
      ) : (
        part
      ),
    );
  };

  return (
    <ItemWrapper>
      <ImageWrapper>
        <Avatar name={title} image={image} size="large" />
      </ImageWrapper>
      <ContentWrapper>
        <ItemHeader>
          <Title>{title}</Title>
          <DateSpan>
            {isValidDate(date)
              ? new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </DateSpan>
        </ItemHeader>
        <Message>
          {media && <MediaPreview src={media} alt={title} />}
          {highlight(message)}
        </Message>
        {link && (
          <LinkPreview href={link} target="_blank" rel="noreferrer">
            {link}
          </LinkPreview>
        )}
      </ContentWrapper>
    </ItemWrapper>
  );
};

export default MessageResult;
