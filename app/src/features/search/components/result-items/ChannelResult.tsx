import styled from "styled-components";

import Avatar from "@components/Avatar";
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

const UserNameSpan = styled.span`
  color: var(--accent-color);
`;

interface ChannelResultProps {
  title: string;
  image?: string;
  username?: string;
  subscribers?: number;
  chatId?: string;
}

const ChannelResult: React.FC<ChannelResultProps> = ({
  title,
  image,
  username,
  subscribers,
  chatId
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
          {username && <UserNameSpan>@{username}</UserNameSpan>}
          {subscribers && ` • ${subscribers} subscribers`}
        </Preview>
      </ContentWrapper>
    </ItemWrapper>
  );
};

export default ChannelResult;
