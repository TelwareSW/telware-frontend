import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1.2rem auto;
  width: 100%;
  height: 40vh;
  background-image: url("/TelWare.png");
  background-size: cover;
`;

function ProfilePicture() {
  return <StyledDiv data-testid="profile-picture" />;
}

export default ProfilePicture;
