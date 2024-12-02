import { STATIC_MEDIA_URL } from "@constants";
import styled from "styled-components";
import { story } from "types/story";

interface StoryIconProps {
  isMe: boolean;
  stories: story[];
  seenCounter: number;
  photo?: string;
  name: string;
}

const StyledContainer = styled.div<{
  $seenCounter: number;
  $storiesCounter: number;
  $isMe: boolean;
}>`
  ${({ $isMe }) => $isMe && "align-self: flex-start;"}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: ${(props) =>
      props.$seenCounter === props.$storiesCounter
        ? "2px solid gray"
        : "2px solid #f39c12"};
  }
`;

const StyledImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
`;

const StyledName = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #333;
  text-align: center;
`;

function ContactStoryIcon(props: StoryIconProps) {
  const { isMe, stories, photo, name } = props;
  const storiesCounter = stories.length;
  const seenCounter = stories.filter((story: story) => story.viewed).length;

  return (
    <StyledContainer
      $seenCounter={seenCounter}
      $storiesCounter={storiesCounter}
      $isMe={isMe}
    >
      <StyledImage
        src={photo ? `${STATIC_MEDIA_URL}/${photo}` : "/default-avatar.png"}
        alt={`${name}'s avatar`}
      />
      <StyledName>{isMe ? "Your Story" : name}</StyledName>
    </StyledContainer>
  );
}

export default ContactStoryIcon;
