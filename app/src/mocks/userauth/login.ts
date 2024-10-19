import { http, HttpResponse } from "msw";

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginResponseBodySuccess = {
  status: "success";
  message: String;
  data: {
    user: {};
    accessToken: string;
  };
};

type LoginResponseBodyFail = {
  status: "fail" | "error";
  message: String;
  data: {};
};

type LoginResponseBody = LoginResponseBodySuccess | LoginResponseBodyFail;

const MOCK_USER = {
  email: "test@example.com",
  password: "1234",
};

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
          { status: 401 }
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
            accessToken: "accessToken",
          },
        },
        { status: 201 }
      );
    }
  ),
];
