import styled from "styled-components";

interface CheckboxProps {
  id: string;
  isChecked: boolean;
  onChange: () => void;
}

const StyledCheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const StyledCheckbox = styled.input`
  display: none;

  &:checked + span {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  &:checked + span::after {
    content: "";
    display: block;
    width: 0.35rem;
    height: 0.7rem;
    border: solid white;
    border-width: 0 0.15rem 0.15rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const StyledCustomBox = styled.span`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-borders-input);
  border-radius: 0.2rem;
  position: relative;
  transition: all 0.3s;

  &:hover {
    border-color: #888;
  }
`;

function CheckBox(props: CheckboxProps) {
  const { id, isChecked, onChange } = props;

  return (
    <StyledCheckboxContainer>
      <StyledCheckbox
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        test-id={id}
      />
      <StyledCustomBox />
    </StyledCheckboxContainer>
  );
}

export default CheckBox;
