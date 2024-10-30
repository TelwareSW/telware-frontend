import styled from "styled-components";

const StyledDiv = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  width: 100%;
  object-fit: fill;
`;

function ProfilePicture() {
  return (
    <StyledDiv
      data-testid="profile-picture"
      src="https://i.pinimg.com/564x/26/76/a1/2676a1898da6edae9fc648c94332903f.jpg"
    />
  );
}

export default ProfilePicture;
