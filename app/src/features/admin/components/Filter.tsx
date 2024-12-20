import { useState } from "react";
import styled from "styled-components";

interface Props {
  filters: string[];
  onFilterChange: (filter: string) => void;
}

const FilterContainer = styled.div<{ $filters: number }>`
  display: flex;

  padding: 0;
  background-color: var(--admin-sidebar-bg);
  width: ${({ $filters }) => ($filters > 1 ? "fit-content" : "100%")};
  margin: 0 auto;
  & > div {
    border: 1px solid var(--color-border) none;
  }
  & > :first-child {
    border-left: none;
    border-radius: var(--border-radius-left-sided-small);
  }
  & > :last-child {
    border-right: none;
    border-radius: var(--border-radius-right-sided-small);
  }
  border-radius: var(--border-radius-default-small);
`;

const FilterCategory = styled.div<{ $active?: boolean }>`
  padding: 0.8rem;
  width: 10rem;
  text-align: center;
  cursor: pointer;
  color: var(--color-text);
  font-size: 1.2rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--color-chat-active);
  }
  background-color: ${({ $active }) =>
    $active ? "var(--color-chat-active)" : "inherit"};
`;
function Filter(props: Props) {
  const { filters, onFilterChange } = props;
  const [activeFilter, setActiveFilter] = useState(0);
  const handleFilterChange = (filter: string, index: number) => {
    setActiveFilter(index);
    onFilterChange(filter);
  };

  return (
    <FilterContainer $filters={filters?.length}>
      {filters.map((filter, index) => (
        <FilterCategory
          key={filter}
          onClick={() => handleFilterChange(filter, index)}
          $active={activeFilter === index}
        >
          {filter}
        </FilterCategory>
      ))}
    </FilterContainer>
  );
}

export default Filter;
