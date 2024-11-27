import { useState, useEffect } from "react";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import Icon from "@components/Icon";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: var(--color-background-secondary);
  box-shadow: 0 0 0.625rem 0 var(--color-default-shadow);

  &:focus-within {
    border: 1px solid var(--color-search-border);
  }
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: var(--color-text);
  flex: 1;
  font-size: 14px;
  margin-left: 1rem;
  width: 100%;

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuggestionButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

interface SearchBarProps {
  onClose: () => void;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
        setIsSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearchLoading(true);
  };

  return (
    <SearchContainer>
      <Icon>
        {isSearchLoading ? getIcon("CircularProgress") : getIcon("Search")}
      </Icon>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <SuggestionButtons>
        <IconButton>{getIcon("KeyboardArrowUp")}</IconButton>
        <IconButton>{getIcon("KeyboardArrowDown")}</IconButton>
      </SuggestionButtons>
      <IconButton onClick={onClose}>{getIcon("Close")}</IconButton>
    </SearchContainer>
  );
};

export default SearchBar;
