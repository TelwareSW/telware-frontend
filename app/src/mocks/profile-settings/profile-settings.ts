import { http, HttpResponse } from "msw";

const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

export const profileSettingsMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.get("/users/me", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: {
          user,
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
