import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const StyledSearchBar = styled.div`
  margin-left: 1rem;
  position: relative;
  &:focus-within > svg {
    color: var(--color-search-border);
  }
  max-width: 20rem;
`;

const StyledSearchIcon = styled(SearchOutlined)`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  font-size: 1.2rem;
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
    <StyledSearchBar>
      <StyledInput type="text" placeholder="Search" data-set="general-search" />
      <StyledSearchIcon />
    </StyledSearchBar>
  );
}

export default SearchBar;
