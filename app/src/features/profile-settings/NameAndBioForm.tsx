import styled from "styled-components";
import TextBox from "../../components/TextBox";

const SettingContainer = styled.div`
  padding: 1rem 1.5rem;
`;

function NameAndBioForm() {
  return (
    <SettingContainer>
      <TextBox label="Name" id="name" />
      <TextBox label="email" id="email" />
      <TextBox label="Test (required)" id="required" />
    </SettingContainer>
  );
}

export default NameAndBioForm;
