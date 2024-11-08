import { http, HttpResponse } from "msw";
import { MOCK_USER } from "@mocks/mockData";

export const profileSettingsMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.get("/users/me", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: MOCK_USER,
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
