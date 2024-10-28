import RadioInput, {
  RadioInputProps,
} from "@components/inputs/radio-input/RadioInput";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 2rem 2rem;
  border-bottom: 1px solid var(--color-item-hover);
`;

function SettingsUpdate(radioData: RadioInputProps) {
  return (
    <StyledDiv>
      <RadioInput {...radioData} />
    </StyledDiv>
  );
}

export default SettingsUpdate;
