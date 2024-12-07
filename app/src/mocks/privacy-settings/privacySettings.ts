import blockList from "@mocks/data/blocklist";
import { allChats } from "@mocks/data/chats";
import { endPts } from "features/privacy-settings/service/changeSettings";
import { http, HttpResponse } from "msw";
import { activeStatesStrings, privacyStatesStrings } from "types/sideBar";

type requestType = {
  privacy: activeStatesStrings | privacyStatesStrings;
};

export const privacySettingsMock = [
  http.patch<{ path: endPts }, requestType>(
    "/users/privacy/:path",
    async ({ request }) => {
      const body = await request.json();
      if (!body.privacy) return HttpResponse.json({}, { status: 401 });
      return HttpResponse.json({}, { status: 200 });
    },
  ),

  http.get("/users/block", async () => {
    return HttpResponse.json({
      users: blockList,
    });
  }),

  http.patch("/users/block/:id", async (req) => {
    const id = req.params.id;
    const user = allChats.find((item) => item.id.toString() === id);
    if (user) {
      blockList.push({
        id: user.id,
        name: user.name,
        username: user.name.toLowerCase() + "123",
      });

      return HttpResponse.json({}, { status: 200 });
    }
    return HttpResponse.json({ message: "user not found" }, { status: 404 });
  }),

  http.delete("/users/block/:id", async (req) => {
    const id = req.params.id;

    const index = blockList.findIndex((item) => item.id.toString() === id);
    if (index === -1)
      return HttpResponse.json(
        { status: "user not in block list" },
        { status: 404 },
      );

    blockList.splice(index, 1);
    return HttpResponse.json({}, { status: 200 });
  }),
];
