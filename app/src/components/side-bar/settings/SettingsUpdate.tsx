import RadioInput, {
  RadioInputProps,
} from "@components/inputs/radio-input/RadioInput";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 2rem 2rem;
  border-bottom: 1rem solid var(--color-item-hover);
  border-radius: var(--border-radius-modal);
`;

function SettingsUpdate(radioData: RadioInputProps) {
  return (
    <StyledDiv>
      <RadioInput {...radioData} />
    </StyledDiv>
  );
}

export default SettingsUpdate;
