import { API_URL } from "@constants";
import { SearchRequest, SearchResponseData } from "../types/search";

async function Search(
  searchRequest: SearchRequest,
): Promise<SearchResponseData | undefined> {
  if (!searchRequest.query) {
    return undefined;
  }

  const filterString = searchRequest.filter.join(",");
  const searchSpaceString = searchRequest.searchSpace.join(",");

  const res = await fetch(`${API_URL}/search/search-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    body: JSON.stringify({
      query: searchRequest.query,
      searchSpace: searchSpaceString,
      filter: filterString,
      isGlobalSearch: searchRequest.isGlobalSearch,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  const resultData = data.data;

  return resultData;
}

export { Search };
