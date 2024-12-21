import React, { useMemo } from "react";
import { RootState } from "@state/store";
import { useSelector } from "react-redux";
import { useSearch } from "@features/search/hooks/useSearch";
import { SEARCH_TABS } from "@features/search/data/tabs-components-map";
import NoResultsFound from "./NoResultsFound";
import {
  hasResults,
  renderGlobalResults,
  renderMessageResults
} from "../utils/searchTabsHelpers";
import ChannelResult from "./result-items/ChannelResult";
import {
  SearchResultChannel,
  SearchResultGroup,
  SearchResultMessage,
  SearchResultUser
} from "../types/search";
import { useSearchPrivate } from "../hooks/useSearchPrivate";

const SearchTab: React.FC = () => {
  const { searchTerm, selectedTab } = useSelector(
    (state: RootState) => state.globalSearch
  );

  const currentTab = SEARCH_TABS.find((tab) => tab.title === selectedTab);

  const searchRequest = useMemo(
    () => ({
      query: searchTerm,
      filter: currentTab?.filter || [],
      searchSpace: currentTab?.searchSpace || [],
      isGlobalSearch: currentTab?.isGlobalSearch || false
    }),
    [searchTerm, currentTab]
  );

  const { data, isLoading, error } = useSearch(searchRequest);
  const {
    searchResults: privateSearchResults,
    isLoading: isPrivateLoading,
    error: privateError
  } = useSearchPrivate(searchRequest);

  if (isLoading || isPrivateLoading)
    return (
      <NoResultsFound
        message="Loading..."
        subMessage="Wait for a moment please"
      />
    );

  if (error || privateError)
    return (
      <NoResultsFound
        message="An error occurred"
        subMessage="Please try again later"
      />
    );

  if (!hasResults(data)) return <NoResultsFound />;

  return (
    <div style={{ height: "100%" }}>
      {selectedTab !== "Channels" &&
        renderMessageResults(
          privateSearchResults as SearchResultMessage[],
          ["text", "image", "video", "GIF", "sticker", "link", "file", "audio"],
          searchTerm
        )}
      {renderMessageResults(data!.searchResult, ["text"], searchTerm)}
      {renderMessageResults(
        data!.searchResult,
        ["image", "video", "GIF", "sticker"],
        searchTerm
      )}
      {renderMessageResults(data!.searchResult, ["link"], searchTerm)}
      {renderMessageResults(data!.searchResult, ["file"], searchTerm)}
      {renderMessageResults(data!.searchResult, ["audio"], searchTerm)}

      {renderGlobalResults<SearchResultGroup>(
        data?.globalSearchResult?.groups || [],
        "Groups",
        (group) => (
          <ChannelResult
            data-testid={`search-group-${group?.id}`}
            key={`group-${group?.id}`}
            title={group?.name}
            image={group?.photo}
            username={group?.name}
            subscribers={group?.numberOfMembers}
            chatId={group?.id}
          />
        )
      )}

      {renderGlobalResults<SearchResultChannel>(
        data?.globalSearchResult?.channels || [],
        "Channels",
        (channel) => (
          <ChannelResult
            data-testid={`search-channel-${channel?.id}`}
            key={`channel-${channel?.id}`}
            title={channel?.name}
            image={channel?.photo}
            username={channel?.name}
            subscribers={channel?.numberOfMembers}
            chatId={channel?.id}
          />
        )
      )}

      {renderGlobalResults<SearchResultUser>(
        data?.globalSearchResult?.users || [],
        "Users",
        (user) => (
          <ChannelResult
            data-testid={`search-user-${user?.id}`}
            key={`user-${user?.id}`}
            title={`${user?.screenFirstName} ${user?.screenLastName}`}
            image={user?.photo}
            username={user?.username}
          />
        )
      )}
    </div>
  );
};

export default SearchTab;
