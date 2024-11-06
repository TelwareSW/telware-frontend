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
  message: string;
  data: object;
};

type SignupResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: object;
};

type SignupResponseBody = SignupResponseBodySuccess | SignupResponseBodyFail;

export const signupMock = [
  http.post<object, SignupRequestBody, SignupResponseBody>(
    `mock/auth/signup`,
    async ({ request }) => {
      await request.json();
      const isValid = true;
      if (!isValid) {
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
