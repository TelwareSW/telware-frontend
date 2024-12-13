import { http, HttpResponse } from "msw";

type PasswordRequestBodySend = {
  email: string;
};

type PasswordRequestBodyVerify = {
  email: string;
  code: string;
};

type PasswordResponseSuccess = {
  status: "success";
  message: string;
};

type PasswordResponseError = {
  status: "fail" | "error";
  message: string;
};

type PasswordResponseBody = PasswordResponseSuccess | PasswordResponseError;

export const forgetPassword = [
  http.post<object, PasswordRequestBodySend, PasswordResponseBody>(
    `/auth/password/forget`,
    async ({ request }) => {
      await request.json();
      const isValid = false;

      if (!isValid) {
        return HttpResponse.json(
          {
            message: "Cannot send the email, please retry",
            status: "error",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          message: "Check your email.",
          status: "success",
        },
        { status: 201 },
      );
    },
  ),
];

export const resetPassword = [
  http.post<object, PasswordRequestBodyVerify, PasswordResponseBody>(
    `/auth/password/reset/1`,
    async ({ request }) => {
      await request.json();
      const isValid = false;

      if (!isValid) {
        return HttpResponse.json(
          {
            message: "Incorrect code , please retry",
            status: "error",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          message: "Successful! Redirecting...",
          status: "success",
        },
        { status: 201 },
      );
    },
  ),
];
