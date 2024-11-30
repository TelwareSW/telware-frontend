import { messages } from "@mocks/data/messages";
import { http, HttpResponse } from "msw";
import { DeleteType, MessageStatus, MessageTypes } from "types/messages";

const MESSAGES = Array.from({ length: 200 }, (_, index) => ({
  id: `${index + 1}`,
  chatId: `chat-${Math.floor(index / 50) + 1}`,
  content: `Message ${index + 1}`,
  senderId: `${index % 2 === 0 ? "1" : "2"}`,
  type: MessageTypes.normal,
  createdAt: new Date("2024-11-27T10:00:00").toISOString(),
  updatedAt: new Date("2024-11-27T10:00:00").toISOString(),
  parentMessageId: "",
  isDeleted: false,
  isPinned: false,
  deleteType: DeleteType.none,
  status: MessageStatus.sent,
  isOptionListOpen: false,
}));

export const paginationMock = [
  http.get("/chats/messages/:chatId", async ({ params, request }) => {
    const url = new URL(request.url);

    console.log(url.searchParams.get("page"));

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMessages = MESSAGES.slice(startIndex, endIndex);
    console.log(startIndex, endIndex);
    console.log(paginatedMessages);

    return HttpResponse.json(
      {
        status: "success",
        data: { messages: paginatedMessages, nextPage: page + 1 },
        message: "Messages retrieved successfully",
      },
      { status: 200 }
    );
  }),
];
