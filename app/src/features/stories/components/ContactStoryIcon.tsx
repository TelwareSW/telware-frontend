import styled from "styled-components";
import { story } from "types/story";

interface StoryIconProps {
  isMe: boolean;
  storiesCounter: number;
  seenCounter: number;
  avatar?: string;
  name: string;
}

const StyledContainer = styled.div<{
  $seenCounter: number;
  $storiesCounter: number;
}>`
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
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

function ContactStoryIcon(props: StoryIconProps) {
  const { isMe, stories, avatar, name } = props;
  const storiesCounter = stories.length;
  const seenCounter = stories.filter((story: story) => story.viewed).length;

  return (
    <StyledContainer
      $seenCounter={seenCounter}
      $storiesCounter={storiesCounter}
    >
      <img src={avatar} alt={name} />
      <p>{name}</p>
    </StyledContainer>
  );
}

export default ContactStoryIcon;
