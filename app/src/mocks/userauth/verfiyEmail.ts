import { http, HttpResponse } from "msw";

type EmailRequestBodySend = {
  email: string;
};

type EmailRequestBodyVerify = {
  email: string;
  code: string;
};

type EmailResponseSuccess = {
  status: "success";
  message: string;
};

type EmailResponseError = {
  status: "fail" | "error";
  message: string;
};

type EmailResponseBody = EmailResponseSuccess | EmailResponseError;

const API_ENDPOINT = "";

export const sendEmailConfirmationMock = [
  http.post<object, EmailRequestBodySend, EmailResponseBody>(
    `${API_ENDPOINT}/auth/send-confirmation`,
    async ({ request }) => {
      await request.json();
      const isValid = true;

      if (!isValid) {
        return HttpResponse.json(
          {
            message: "Cannot send the confirmation, please retry",
            status: "error",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          message: "Confirmation code sent. Check your email.",
          status: "success",
        },
        { status: 201 },
      );
    },
  ),
];

export const verifyEmailMock = [
  http.post<object, EmailRequestBodyVerify, EmailResponseBody>(
    `${API_ENDPOINT}/auth/verify`,
    async ({ request }) => {
      await request.json();
      const isValid = false;

      if (!isValid) {
        return HttpResponse.json(
          {
            message: "Incorrect code, please retry",
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
