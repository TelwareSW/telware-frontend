import { allChats } from "@mocks/data/chats";
import { http, HttpResponse } from "msw";

export const chats = [
  http.get("/chats", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: { chats: allChats },
      },
      { status: 200 },
    );
  }),

  http.get("/chats/:id", async ({ params }) => {
    const chat = allChats.find((chat) => chat._id.toString() === params.id);

    return HttpResponse.json(
      {
        status: "success",
        data: { chat: chat || null },
      },
      { status: 200 },
    );
  }),
];
