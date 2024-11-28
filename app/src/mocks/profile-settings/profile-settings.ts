import { http, HttpResponse } from "msw";
import { MOCK_USER1 } from "@mocks/data/users";

export const profileSettingsMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.get("/users/me", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: {
          user: MOCK_USER1,
        },
      },
      { status: 200 }
    );
  }),

  http.patch("/users/me", async ({ request }) => {
    const newProfileSettings = await request.json();
    return HttpResponse.json(
      {
        status: "success",
        data: newProfileSettings,
      },
      { status: 200 }
    );
  }),
];
