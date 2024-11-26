import { SESSIONS } from "@mocks/data/Sessions";
import { http, HttpResponse } from "msw";

export const devicesMock = [
  http.get("/auth/sessions", async () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "Sessions fetched successfully",
        data: {
          sessions: SESSIONS,
        },
      },
      { status: 200 },
    );
  }),
];
