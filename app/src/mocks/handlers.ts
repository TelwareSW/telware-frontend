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

export const handlers = [
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

  http.get("/users/me", async ({ request }) => {
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

  http.patch("/users/privacy/last-seen", async ({ request }) => {
    return HttpResponse.json({
      status: "success",
    });
  }),
];
