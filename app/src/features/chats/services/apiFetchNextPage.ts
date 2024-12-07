import { API_URL } from "@constants";

async function apiFetchNextPage({
  chatId,
  pageParam = 1,
}: {
  pageParam?: number;
  chatId: string;
}) {
  console.log(chatId);
  console.log(pageParam);
  const res = await fetch(
    `${API_URL}/chats/messages/${chatId}?page=${pageParam}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
    },
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  console.log(data);

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return { messages: data.data.messages, nextPage: data.data.nextPage };
}

export { apiFetchNextPage };
