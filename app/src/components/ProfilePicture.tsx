import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-icon-secondary);
  border-radius: var(--border-radius-circle);
  box-shadow: var(--box-shadow);
  width: 8rem;
  height: 8rem;
  margin: 1.2rem auto;
`;

const StyledImg = styled.img`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: var(--border-radius-circle);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

function ProfilePicture() {
  return (
    <StyledDiv>
      <StyledImg src="/TelWare.png" alt="profile picture" />
    </StyledDiv>
  );
}

export default ProfilePicture;
