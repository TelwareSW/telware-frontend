import { Link } from "react-router-dom";
import styled from "styled-components";
import NameAndBioForm from "./NameAndBioForm";
import UserNameForm from "./UserNameForm";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30rem;
  min-height: 100dvh;
  background-color: var(--color-background);
`;

function ProfileSettings() {
  return (
    <SideBarContainer>
      <NameAndBioForm />
      <UserNameForm />
    </SideBarContainer>
  );
}

export default ProfileSettings;
