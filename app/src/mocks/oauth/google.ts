import { http, HttpResponse } from "msw";
import { TOKEN } from "@mocks/mockData";

type LoginRequestBody = {
  code: string;
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

export const MOCK_USER = {
  email: "test@example.com",
  password: "1234",
  firstName: "John",
  lastName: "Doe",
  bio: "Hello, I'm John Doe",
  photo:
    "https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/462460819_518473281043631_6485009024565374350_n.jpg?ccb=11-4&oh=01_Q5AaINdhN3wt4c6ZnmGni8RNhM8fIvquSRicC2QT82X6ddeB&oe=6727186F&_nc_sid=5e03e0&_nc_cat=100",
  username: "johndoe",
};

export const googleOauthMock = [
  http.post<{}, LoginRequestBody, LoginResponseBody>(
    "/auth/oauth/google",
    async ({ request }) => {
      const { code } = await request.json();
      console.log(code);

      return HttpResponse.json(
        {
          message: "Successful login",
          status: "success",
          data: {
            user: MOCK_USER,
            sessionID: TOKEN,
          },
        },
        {
          status: 201,
          headers: {
            "Set-Cookie": `accessToken=${TOKEN}; HttpOnly; SameSite=Strict; Path=/`,
          },
        }
      );
    }
  ),
];
