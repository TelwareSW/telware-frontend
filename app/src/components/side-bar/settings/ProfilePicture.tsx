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
      src="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/462460819_518473281043631_6485009024565374350_n.jpg?ccb=11-4&oh=01_Q5AaINdhN3wt4c6ZnmGni8RNhM8fIvquSRicC2QT82X6ddeB&oe=6727186F&_nc_sid=5e03e0&_nc_cat=100"
    />
  );
}

export default ProfilePicture;
