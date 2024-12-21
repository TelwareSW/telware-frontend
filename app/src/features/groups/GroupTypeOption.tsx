import styled from "styled-components";

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const RadioButton = styled.div<{ selected: boolean }>`
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid
    ${({ selected }) =>
      selected ? "var(--accent-color)" : "var(--color-text-secondary)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

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
  onClick: () => void;
  groupType: string | undefined;
}

const GroupTypeOption = ({
  type,
  selected,
  onClick,
  groupType
}: GroupTypeOptionProps) => (
  <Option onClick={onClick}>
    <RadioButton selected={selected} />
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
