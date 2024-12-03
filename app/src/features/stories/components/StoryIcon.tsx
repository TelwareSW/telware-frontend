import styled from "styled-components";
import { story } from "types/story";
import Avatar from "@components/Avatar";

interface StoryIconProps {
  stories: story[];
  photo?: string;
  name: string;
  onView?: (userId: string) => void;
  isCollapsed?: boolean;
  userId?: string;
  isMyStory?: boolean;
}

const StyledContainer = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  padding: ${(props) => (props.$isCollapsed ? "0" : "0.5rem")};
  min-width: ${(props) => (props.$isCollapsed ? "55px" : "90px")};
  border-radius: ${(props) =>
    props.$isCollapsed
      ? "var(--border-radius-circle)"
      : "var(--border-radius-default)"};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const StyledImageContainer = styled.div<{
  $isMyStory?: boolean;
}>`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-avatar-shadow);
  padding: 3px;
  display: block;
`;

const StyledName = styled.p`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  color: var(--secondary-text-color);
  text-align: center;
  white-space: nowrap;
`;

function StoryIcon(props: StoryIconProps) {
  const { photo, name, userId, onView, isMyStory, isCollapsed = false } = props;

  const displayName = name?.slice(0, 8) + (name?.length > 8 ? "..." : "") || "";

  const handleIconClicked = () => {
    if (userId && onView) {
      onView(userId);
    }
  };

  return (
    <StyledContainer $isCollapsed={isCollapsed} onClick={handleIconClicked}>
      <StyledImageContainer $isMyStory={isMyStory}>
        <Avatar name={name} image={photo} />
      </StyledImageContainer>
      {!isCollapsed && <StyledName>{displayName}</StyledName>}
    </StyledContainer>
  );
}

export default StoryIcon;
