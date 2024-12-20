import styled from "styled-components";
import AudioResult from "../components/result-items/AudioResult";
import FileResult from "../components/result-items/FileResult";
import MessageResult from "../components/result-items/MessageResult";
import {
  SearchFilter,
  SearchResponseData,
  SearchResultChannel,
  SearchResultGroup,
  SearchResultMessage,
  SearchResultUser,
} from "../types/search";

const SearchSectionHeader = styled.div`
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background-color: var(--color-background-secondary);
`;

export const getTitle = (
  item:
    | SearchResultMessage
    | SearchResultGroup
    | SearchResultChannel
    | SearchResultUser,
) => {
  return (
    (item as SearchResultMessage).chatId?.name ||
    `${(item as SearchResultUser).screenFirstName} ${(item as SearchResultUser).screenLastName}` ||
    `${(item as SearchResultMessage).senderId?.screenFirstName} ${(item as SearchResultMessage).senderId?.screenLastName}`
  );
};

export const getImage = (
  item:
    | SearchResultMessage
    | SearchResultGroup
    | SearchResultChannel
    | SearchResultUser,
) => {
  return (
    (item as SearchResultMessage).chatId?.photo ||
    (item as SearchResultUser | SearchResultChannel | SearchResultChannel)
      .photo ||
    (item as SearchResultMessage).senderId?.photo
  );
};

export const hasResults = (data: SearchResponseData | undefined) => {
  return (
    !!data &&
    (data?.searchResult.length > 0 ||
      data?.globalSearchResult.users.length > 0 ||
      data?.globalSearchResult.groups.length > 0 ||
      data?.globalSearchResult.channels.length > 0)
  );
};

export const renderMessageResults = (
  messages: SearchResultMessage[],
  contentTypes: SearchFilter[],
  searchTerm: string,
) => {
  return messages
    .filter((message) => contentTypes.includes(message?.contentType))
    .map((message) => {
      const commonProps = {
        searchTerm,
        message: message?.content,
        title: getTitle(message),
        image: getImage(message),
        date: message?.timestamp,
        chatId: message?.chatId?.id,
      };

      switch (message?.contentType) {
        case "text":
          return (
            <MessageResult
              key={`search-message-${message?.id}`}
              data-testid={`search-message-${message?.id}`}
              {...commonProps}
            />
          );
        case "image":
        case "video":
        case "GIF":
        case "sticker":
          return (
            <MessageResult
              key={`search-message-${message?.id}`}
              data-testid={`search-message-${message?.id}`}
              {...commonProps}
              media={message?.media}
            />
          );
        case "link":
          return (
            <MessageResult
              key={`search-message-${message?.id}`}
              data-testid={`search-message-${message?.id}`}
              {...commonProps}
              link={message?.content}
            />
          );
        case "file":
          return (
            <FileResult
              key={`search-message-${message?.id}`}
              data-testid={`search-message-${message?.id}`}
              {...commonProps}
            />
          );
        case "audio":
          return (
            <AudioResult
              key={`search-message-${message?.id}`}
              data-testid={`search-message-${message?.id}`}
              {...commonProps}
              file={message?.media}
            />
          );
        default:
          return null;
      }
    });
};

export const renderGlobalResults = <T,>(
  results: T[],
  sectionTitle: string,
  renderItem: (item: T) => JSX.Element,
) => {
  if (!results || results.length === 0) return null;
  return (
    <>
      <SearchSectionHeader data-testid={`search-section-${sectionTitle}`}>
        {sectionTitle}
      </SearchSectionHeader>
      {results.map(renderItem)}
    </>
  );
};
