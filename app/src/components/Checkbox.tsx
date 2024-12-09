import styled from "styled-components";

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    width: 1.3em;
    height: 1.3rem;
    margin-right: 0.5rem;

    border: 2px solid var(--color-text-secondary);
    border-radius: 4px;

    background-color: var(--color-background);

    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: "";
      width: 10px;
      height: 5px;
      border: solid white;
      border-width: 0 0 2px 2px;
      transform: scale(0) rotate(-45deg);
      opacity: 0;
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
    }

    &:checked {
      background-color: var(--accent-color);

      &::after {
        transform: scale(1) rotate(-45deg);
        opacity: 1;
      }
    }

    &:focus {
      outline: 2px solid var(--focus-color);
    }
  }
`;

function Checkbox() {
  return (
    <CheckboxWrapper>
      <input type="checkbox" />
    </CheckboxWrapper>
  );
}

export default Checkbox;
