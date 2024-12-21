import styled from "styled-components";

const Option = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const RadioButton = styled.button<{ selected: boolean; disabled: boolean }>`
  background: transparent;
  flex-shrink: 0;

  width: 1.2rem;
  height: 1.2rem;

  border-radius: 50%;
  border: 2px solid
    ${({ selected }) =>
      selected ? "var(--accent-color)" : "var(--color-text-secondary)"};
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &::after {
    content: "";
    width: ${({ selected }) => (selected ? "0.7rem" : "0")};
    height: ${({ selected }) => (selected ? "0.7rem" : "0")};
    background-color: var(--accent-color);
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Title = styled.p`
  font-weight: 500;
  color: var(--color-text);
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

interface GroupTypeOptionProps {
  type: "private" | "public";
  selected: boolean;
  isAdmin: boolean;
  onClick: () => void;
  groupType: string | undefined;
}

const GroupTypeOption = ({
  type,
  selected,
  onClick,
  groupType,
  isAdmin
}: GroupTypeOptionProps) => (
  <Option disabled={!isAdmin} onClick={onClick}>
    <RadioButton selected={selected} disabled={!isAdmin} />
    <Details>
      <Title>{`${type.charAt(0).toUpperCase() + type.slice(1)} ${groupType}`}</Title>
      <Description>
        {`${type.charAt(0).toUpperCase() + type.slice(1)} ${groupType} ${
          type === "private"
            ? "cannot be found in search."
            : "can be found in search."
        }`}
      </Description>
    </Details>
  </Option>
);

export default GroupTypeOption;
