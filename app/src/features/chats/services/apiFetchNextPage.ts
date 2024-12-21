import { API_URL } from "@constants";

async function apiFetchNextPage({
  chatId,
  pageParam,
}: {
  pageParam?: number;
  chatId: string;
}) {
  const res = await fetch(
    `${API_URL}/chats/messages/${chatId}?page=${pageParam}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
    }
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return { messages: data.data.messages, nextPage: data.data.nextPage };
}

export { apiFetchNextPage };
