import {
  MOCK_USER1,
  MOCK_USER2,
  BANNNED,
  DEACTIVATED,
  ADMIN,
  TOKEN,
} from "@mocks/data/users";
import { http, HttpResponse } from "msw";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponseBodySuccess = {
  status: "success";
  message: string;
  data: {
    user: object;
    sessionID: string;
  };
};

type LoginResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: object;
};

type LoginResponseBody = LoginResponseBodySuccess | LoginResponseBodyFail;

export const loginMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.post<object, LoginRequestBody, LoginResponseBody>(
    "/auth/login",
    async ({ request }) => {
      const { email, password } = await request.json();

      const isValidUser =
        (email === MOCK_USER1.email && password === MOCK_USER1.password) ||
        (email === MOCK_USER2.email && password === MOCK_USER2.password) ||
        (email === BANNNED.email && password === BANNNED.password) ||
        (email === DEACTIVATED.email && password === DEACTIVATED.password) ||
        (email === ADMIN.email && password === ADMIN.password);

      if (!isValidUser) {
        return HttpResponse.json(
          {
            message: "Invalid email or password",
            status: "error",
            data: {},
          },
          { status: 401 }
        );
      }

      const isAdmin = email === ADMIN.email;
      if (isAdmin) {
        localStorage.setItem("user", JSON.stringify(ADMIN));
        return HttpResponse.json(
          {
            message: "Successful login",
            status: "success",
            data: {
              user: ADMIN,
              sessionID: TOKEN,
            },
          },
          {
            status: 201,
            headers: {
              "Set-Cookie": `sessionID=${TOKEN}; HttpOnly; SameSite=Strict; Path=/`,
            },
          }
        );
      }

      const isnotActiveUser =
        email === BANNNED.email || email === DEACTIVATED.email;
      if (isnotActiveUser) {
        return HttpResponse.json(
          {
            message: "User is banned or deactivated",
            status: "error",
            data: {},
          },
          { status: 403 }
        );
      }

      const loggedInUser = MOCK_USER1.email === email ? MOCK_USER1 : MOCK_USER2;
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return HttpResponse.json(
        {
          message: "Successful login",
          status: "success",
          data: {
            user: loggedInUser,
            sessionID: TOKEN,
          },
        },
        {
          status: 201,
          headers: {
            "Set-Cookie": `sessionID=${TOKEN}; HttpOnly; SameSite=Strict; Path=/`,
          },
        }
      );
    }
  ),
];
