import Avatar from "@components/Avatar";
import Heading from "@components/Heading";
import styled, { css } from "styled-components";

interface UserInfoProps {
  name: string;
  photo: string;
  elapsedTime: string;
  isVertical?: boolean;
}
const StoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;

  z-index: 1;
`;
const StyledUserInfo = styled.div<{ $isVertical?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  ${(props) =>
    props.$isVertical &&
    css`
      flex-direction: column;
      gap: 0.2rem;
      justify-content: center;
      align-items: flex-start;
    `};
  & > h5 {
    color: white !important;
  }
`;
const ElapsedTime = styled.p`
  font-size: 0.8rem;
  color: white;
  text-align: left;
`;
function UserInfo(props: UserInfoProps) {
  const { name, photo, elapsedTime, isVertical } = props;

  return (
    <StoryHeader>
      <Avatar name={name} image={photo} />
      <StyledUserInfo $isVertical={isVertical}>
        <Heading as="h5">{name}</Heading>
        <ElapsedTime>{elapsedTime}</ElapsedTime>
      </StyledUserInfo>
    </StoryHeader>
  );
}

export default UserInfo;
