import messages from "@mocks/data/messages";
import { http, HttpResponse } from "msw";

export const paginationMock = [
  http.get("/chats/messages/:chatId", async ({ params, request }) => {
    const url = new URL(request.url);

    console.log(url.searchParams.get("page"));

    const page = parseInt(url.searchParams.get("page") || "1", 10);

    return HttpResponse.json(
      {
        status: "success",
        data: { messages, nextPage: page + 1 },
        message: "Messages retrieved successfully",
      },
      { status: 200 }
    );
  }),
];
