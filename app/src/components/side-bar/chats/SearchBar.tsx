import { getIcon } from "@data/icons";
import { setSearchTerm } from "@state/messages/global-search";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  margin-left: 1rem;
  position: relative;
  width: 100%;

  &:focus-within > svg {
    color: var(--color-search-border);
  }
`;

const Icon = styled.div`
  > svg {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
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
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.globalSearch);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <StyledSearchBar data-testid="general-search-bar">
      <Input
        type="text"
        placeholder="Search"
        data-testid="general-search"
        onChange={onSearch}
        value={searchTerm}
      />
      <Icon data-testid="general-serach-icon">{getIcon("Search")}</Icon>
    </StyledSearchBar>
  );
}

export default SearchBar;
