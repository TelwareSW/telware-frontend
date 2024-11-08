import { allChats } from "@mocks/data/Chats";
import { http, HttpResponse } from "msw";

export const chats = [
  http.get("/chats", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: allChats,
      },
      { status: 200 }
    );
  }),

  http.get("/chat/:id", async ({ params }) => {
    const chat = allChats.find((chat) => chat.id.toString() === params.id);

    return HttpResponse.json(
      {
        status: "success",
        data: chat || null,
      },
      { status: 200 }
    );
  }),
];
