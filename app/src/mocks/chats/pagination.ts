import { newMessages } from "@mocks/data/messages";
import { http, HttpResponse } from "msw";

export const paginationMock = [
  http.get("/chats/messages/:chatId", async ({ request }) => {
    const url = new URL(request.url);

    console.log(url.searchParams.get("page"));

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMessages = newMessages.slice(startIndex, endIndex);

    return HttpResponse.json(
      {
        status: "success",
        data: { messages: paginatedMessages, nextPage: page + 1 },
        message: "Messages retrieved successfully",
      },
      { status: 200 },
    );
  }),
];
