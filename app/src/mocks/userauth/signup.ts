import { http, HttpResponse } from "msw";

type SignupRequestBody = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  reCaptchaResponse: string;
};

type SignupResponseBodySuccess = {
  status: "success";
  message: String;
  data: {};
};

type SignupResponseBodyFail = {
  status: "fail" | "error";
  message: String;
  data: {};
};

type SignupResponseBody = SignupResponseBodySuccess | SignupResponseBodyFail;

const API = import.meta.env.VITE_BACKEND_API;
export const signupMock = [
  http.post<{}, SignupRequestBody, SignupResponseBody>(
    `${API}/signup`,
    async ({ request }) => {
      await request.json();
      const isValidUser = true;
      if (!isValidUser) {
        return HttpResponse.json(
          {
            message: "Invalid data",
            status: "error",
            data: {},
          },
          { status: 401 }
        );
      }

      return HttpResponse.json(
        {
          message: "Successful Signup",
          status: "success",
          data: {},
        },
        { status: 201 }
      );
    }
  ),
];
