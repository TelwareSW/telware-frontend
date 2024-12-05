import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@state/store";

function useScrollToSearchResultsMsg() {
  const { searchResults, searchTerm, currentResultIndex } = useSelector(
    (state: RootState) => state.search,
  );

  useEffect(() => {
    if (searchResults.length > 0) {
      const searchResult = searchResults[currentResultIndex];
      console.log("searchResult", searchResult);
      document
        .querySelectorAll(
          "[data-message-id='" + searchResult.messageId + "']",
        )[0]
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  }, [searchResults, currentResultIndex, searchTerm]);
}

export default useScrollToSearchResultsMsg;
