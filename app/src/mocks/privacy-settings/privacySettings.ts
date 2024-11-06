import { BlockedUserProps } from "@features/privacy-settings/BlockItem";
import blockList from "@mocks/data/blocklist";
import { allChats } from "@mocks/data/chats";
import { endPts } from "features/privacy-settings/service/changeSettings";
import { http, HttpResponse } from "msw";
import { activeStatesStrings, privacyStatesStrings } from "types/sideBar";

type requestType = {
  privacy: activeStatesStrings | privacyStatesStrings;
};

type blockUserRequestType = {
  userId: number;
};

export const privacySettingsMock = [
  http.patch<{ path: endPts }, requestType>(
    "/users/privacy/:path",
    async ({ request }) => {
      const body = await request.json();
      if (!body.privacy) return HttpResponse.json({}, { status: 401 });
      return HttpResponse.json({}, { status: 200 });
    }
  ),

  http.get("/users/block", async () => {
    return HttpResponse.json(
      {
        users: blockList,
      },
      { status: 200 }
    );
  }),

  http.patch<{ id: string }, blockUserRequestType>(
    "/users/block/:id",
    async ({ request }) => {
      const body = await request.json();
      let user = allChats.find((item) => item.id === body.userId);
      if (user) {
        blockList.push({
          id: user.id,
          name: user.name,
          username: user.name.toLowerCase() + "123",
        });

        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json({ message: "user not found" }, { status: 404 });
    }
  ),

  http.delete<{ id: string }, blockUserRequestType>(
    "/users/block/:id",
    async ({ request }) => {
      const body = await request.json();

      if (allChats.find((item) => item.id === body.userId)) {
        blockList.filter((item) => {
          item.id !== body.userId;
        });
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(
        { message: "user is not blocked" },
        { status: 404 }
      );
    }
  ),
];
