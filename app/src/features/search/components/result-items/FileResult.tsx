import styled from "styled-components";

import Avatar from "@components/Avatar";
import { isValidDate } from "@utils/helpers";
import { useNavigate } from "react-router-dom";

const ItemWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
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

const Preview = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

interface FileResultProps {
  title: string;
  image?: string;
  size?: string;
  date?: string;
  chatId?: string;
}

const FileResult: React.FC<FileResultProps> = ({
  title,
  image,
  size,
  date,
  chatId,
}) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    if (chatId) navigate(`/${chatId}`);
  };

  return (
    <ItemWrapper onClick={handleItemClick}>
      <ImageWrapper>
        <Avatar name={title} image={image} />
      </ImageWrapper>
      <ContentWrapper>
        <ItemHeader>
          <Title>{title}</Title>
        </ItemHeader>
        <Preview>
          {size && <span>{size} MB • </span>}
          {(date &&
            isValidDate(date) &&
            new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })) ||
            ""}
        </Preview>
      </ContentWrapper>
    </ItemWrapper>
  );
};

export default FileResult;
