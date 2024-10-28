import { http, HttpResponse } from "msw";
import { TOKEN } from "@mocks/mockData";

export const logoutMock = [
  http.get("/auth/me", ({ cookies }) => {
    if (!cookies.sessionID || cookies.sessionID !== TOKEN) {
      return new HttpResponse(null, { status: 403 });
    }

    return new HttpResponse(null, { status: 201 });
  }),

  http.post("/auth/logout", async () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie": "sessionID=; HttpOnly; Path=/; Max-Age=0",
      },
    });
  }),
];
