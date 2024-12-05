import { getIcon } from "@data/icons";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  margin-left: 1rem;
  position: relative;
  width: 100%;

  &:focus-within > svg {
    color: var(--color-search-border);
  }
`;

const StyledSearchIcon = styled.div`
  > svg {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    font-size: 1.2rem;
  }
`;

const StyledInput = styled.input`
  background-color: var(--color-chat-hover);
  border: 1px solid var(--pattern-color);
  border-radius: var(--border-radius-searchbar);
  color: var(--color-text);
  font-size: 1rem;
  padding: 0.525rem 0 0.525rem 2.5rem;
  outline: solid 1px transparent;
  width: 100%;

  &:focus {
    border-color: var(--color-search-border);
    outline-color: var(--color-search-border);
    caret-color: var(--color-search-border);
  }
  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

function SearchBar() {
  return (
    <StyledSearchBar data-testid="general-search-bar">
      <StyledInput
        type="text"
        placeholder="Search"
        data-testid="general-search"
      />
      <StyledSearchIcon data-testid="general-serach-icon">
        {getIcon("Search")}
      </StyledSearchIcon>
    </StyledSearchBar>
  );
}

export default SearchBar;
