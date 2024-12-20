import styled from "styled-components";

const OptionListContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: var(--color-background-compact-menu);
  backdrop-filter: blur(0.3125rem);
  -webkit-backdrop-filter: blur(0.3125rem);

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  min-width: 9.375rem;

  &:hover {
    cursor: pointer;
    background-color: var(--color-background-compact-menu-hover);
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.3125rem;
  font-size: 0.9rem;
  color: var(--color-text);
`;

type OptionListProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const OptionList = ({ onClick, children }: OptionListProps) => {
  return (
    <OptionListContainer onClick={onClick}>
      <Option>{children}</Option>
    </OptionListContainer>
  );
};

export default OptionList;
