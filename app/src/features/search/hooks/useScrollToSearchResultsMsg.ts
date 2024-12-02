import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@state/store";

function useScrollToSearchResultsMsg() {
  const { searchResults, searchTerm, currentResultIndex } = useSelector(
    (state: RootState) => state.search,
  );
  const searchResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      const searchResult = searchResults[currentResultIndex];
      console.log("searchResult", searchResult);
      document
        .querySelector("[data-message-id='" + searchResult.messageId + "']")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  }, [searchResults, currentResultIndex, searchTerm]);

  return { searchResultRef };
}

export default useScrollToSearchResultsMsg;
