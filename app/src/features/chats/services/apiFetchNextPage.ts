import { API_URL } from "@constants";

async function apiFetchNextPage({
  chatId,
  pageParam = 1,
}: {
  pageParam?: number;
  chatId: string;
}) {
  console.log(pageParam);
  const res = await fetch(
    `${API_URL}/chats/messages/:${chatId}?page=${pageParam}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return { messages: data.data.messages, nextPage: data.data.nextPage };
}

export { apiFetchNextPage };
