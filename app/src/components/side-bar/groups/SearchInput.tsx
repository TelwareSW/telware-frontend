import styled from "styled-components";

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 0.9rem;
  caret-color: var(--accent-color);
  color: var(--color-text);
  outline: none;
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder,
}: SearchInputProps) {
  return (
    <StyledSearchInput
      type="text"
      placeholder={placeholder || "Search..."}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchInput;
