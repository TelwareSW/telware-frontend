import { useState } from "react";
import styled from "styled-components";
import { MOBILE_VIEW, DESKTOP_VIEW } from "@constants";

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
  @media ${MOBILE_VIEW} {
    font-size: 0.8rem;
    width: 5rem;
    padding: 0.4rem 0.2rem;
  }
  @media ${DESKTOP_VIEW} {
    font-size: 1.2rem;
    width: 10rem;
    padding: 0.8rem;
  }
`;
function Filter(props: Props) {
  const { filters, onFilterChange } = props;
  const [activeFilter, setActiveFilter] = useState(0);
  const handleFilterChange = (filter: string, index: number) => {
    setActiveFilter(index);
    onFilterChange(filter);
  };

  return (
    <FilterContainer $filters={filters?.length} data-testid="filter-container">
      {filters.map((filter, index) => (
        <FilterCategory
          key={filter}
          onClick={() => handleFilterChange(filter, index)}
          $active={activeFilter === index}
          data-testid={`filter-${filter}`}
        >
          {filter}
        </FilterCategory>
      ))}
    </FilterContainer>
  );
}

export default Filter;
