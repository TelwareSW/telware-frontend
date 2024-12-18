import React, { useMemo } from "react";
import { RootState } from "@state/store";
import { useSelector } from "react-redux";
import { useSearch } from "@features/search/hooks/useSearch";
import { SEARCH_TABS } from "@features/search/data/tabs-components-map";
import NoResultsFound from "./NoResultsFound";
import {
  hasResults,
  renderGlobalResults,
  renderMessageResults,
} from "../utils/searchTabsHelpers";
import ChannelResult from "./result-items/ChannelResult";
import {
  SearchResultChannel,
  SearchResultGroup,
  SearchResultUser,
} from "../types/search";

const SearchTab: React.FC = () => {
  const { searchTerm, selectedTab } = useSelector(
    (state: RootState) => state.globalSearch,
  );

  const currentTab = SEARCH_TABS.find((tab) => tab.title === selectedTab);

  const searchRequest = useMemo(
    () => ({
      query: searchTerm,
      filter: currentTab?.filter || [],
      searchSpace: currentTab?.searchSpace || [],
      isGlobalSearch: currentTab?.isGlobalSearch || false,
    }),
    [searchTerm, currentTab],
  );

  const { data, isLoading, error } = useSearch(searchRequest);

  if (isLoading)
    return (
      <NoResultsFound
        message="Loading..."
        subMessage="Wait for a moment please"
      />
    );

  if (error)
    return (
      <NoResultsFound
        message="An error occurred"
        subMessage="Please try again later"
      />
    );

  if (!hasResults(data)) return <NoResultsFound />;

  return (
    <div style={{ height: "100%" }}>
      {renderMessageResults(data!.searchResult, ["text"], searchTerm)}
      {renderMessageResults(
        data!.searchResult,
        ["image", "video", "GIF", "sticker"],
        searchTerm,
      )}
      {renderMessageResults(data!.searchResult, ["link"], searchTerm)}
      {renderMessageResults(data!.searchResult, ["file"], searchTerm)}
      {renderMessageResults(data!.searchResult, ["audio"], searchTerm)}

      {renderGlobalResults<SearchResultGroup>(
        data?.globalSearchResult?.groups || [],
        "Groups",
        (group) => (
          <ChannelResult
            key={`group-${group?.id}`}
            title={group?.name}
            image={group?.photo}
            username={group?.name}
            subscribers={group?.numberOfMembers}
          />
        ),
      )}

      {renderGlobalResults<SearchResultChannel>(
        data?.globalSearchResult?.channels || [],
        "Channels",
        (channel) => (
          <ChannelResult
            key={`channel-${channel?.id}`}
            title={channel?.name}
            image={channel?.photo}
            username={channel?.name}
            subscribers={channel?.numberOfMembers}
          />
        ),
      )}

      {renderGlobalResults<SearchResultUser>(
        data?.globalSearchResult?.users || [],
        "Users",
        (user) => (
          <ChannelResult
            key={`user-${user?.id}`}
            title={`${user?.screenFirstName} ${user?.screenLastName}`}
            image={user?.photo}
            username={user?.username}
          />
        ),
      )}
    </div>
  );
};

export default SearchTab;
