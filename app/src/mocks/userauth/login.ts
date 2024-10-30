import { http, HttpResponse } from "msw";
import { MOCK_USER, TOKEN } from "@mocks/mockData";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponseBodySuccess = {
  status: "success";
  message: string;
  data: {
    user: {};
    sessionID: string;
  };
};

type LoginResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: {};
};

type LoginResponseBody = LoginResponseBodySuccess | LoginResponseBodyFail;

export const loginMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.post<{}, LoginRequestBody, LoginResponseBody>(
    "/auth/login",
    async ({ request }) => {
      const { email, password } = await request.json();

      const isValidUser =
        email === MOCK_USER.email && password === MOCK_USER.password;

      if (!isValidUser) {
        return HttpResponse.json(
          {
            message: "Invalid email or password",
            status: "error",
            data: {},
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          message: "Successful login",
          status: "success",
          data: {
            user: {
              email: "test@example.com",
            },
            sessionID: TOKEN,
          },
        },
        {
          status: 201,
          headers: {
            "Set-Cookie": `sessionID=${TOKEN}; HttpOnly; SameSite=Strict; Path=/`,
          },
        },
      );
    },
  ),
];
