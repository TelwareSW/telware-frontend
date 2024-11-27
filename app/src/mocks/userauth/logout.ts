import { http, HttpResponse } from "msw";
import { TOKEN } from "@mocks/mockData";
import { SESSIONS } from "@mocks/data/Sessions";

export const logoutMock = [
  http.get("/auth/me", ({ cookies }) => {
    if (!cookies.sessionID || cookies.sessionID !== TOKEN) {
      return new HttpResponse(null, { status: 403 });
    }

    return HttpResponse.json(
      {
        status: "success",
        message: "Session fetched successfully",
        data: {
          ...SESSIONS[0],
        },
      },
      { status: 201 },
    );
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
