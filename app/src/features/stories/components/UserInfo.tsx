import Avatar from "@components/Avatar";
import Heading from "@components/Heading";
import styled from "styled-components";

interface UserInfoProps {
  name: string;
  avatar: string;
  elapsedTime: string;
}
const StyledStoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const StyledElapsedTime = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;
function UserInfo(props: UserInfoProps) {
  const { name, avatar, elapsedTime } = props;

  return (
    <StyledStoryHeader>
      <Avatar name={name} avatar={avatar} />
      <StyledUserInfo>
        <Heading as="h5">{name}</Heading>
        <StyledElapsedTime>{elapsedTime}</StyledElapsedTime>
      </StyledUserInfo>
    </StyledStoryHeader>
  );
}

export default UserInfo;
