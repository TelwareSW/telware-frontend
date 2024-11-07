import { http, HttpResponse } from "msw";
import { MOCK_MY_STORIES, MOCK_OTHER_USER_STORIES } from "@mocks/mockData";

type AddStoryRequestBody = {
  file: File;
  caption: string;
};

type AddStoryResponseBodySuccess = {
  status: "success";
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      avatarUrl: string;
    };
    sessionID: string;
  };
};

type AddStoryResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: {};
};

type AddStoryResponseBody =
  | AddStoryResponseBodySuccess
  | AddStoryResponseBodyFail;

export const storiesMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.get("/users/stories", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: MOCK_MY_STORIES,
      },
      { status: 200 }
    );
  }),

  http.post<{}, AddStoryRequestBody, AddStoryResponseBody>(
    "/users/stories",
    async ({ request }) => {
      const { file, caption } = await request.json();

      if (file && caption) {
        return HttpResponse.json(
          {
            status: "success",
            message: "Successful Add Story",
            data: {
              user: {
                id: "12345",
                name: "John Doe",
                avatarUrl: "/avatars/john_doe.png",
              },
              sessionID: "abcdef123456",
            },
          },
          {
            status: 201,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return HttpResponse.json(
          {
            status: "fail",
            message: "File or caption missing",
            data: {},
          },
          {
            status: 400,
          }
        );
      }
    }
  ),

  http.delete("/users/stories/:storyId", async ({ params }) => {
    const { storyId } = params;
    if (storyId) {
      return HttpResponse.json(
        {
          status: "success",
          message: "Story deleted",
          data: {},
        },
        {
          status: 200,
        }
      );
    } else {
      return HttpResponse.json(
        {
          status: "fail",
          message: "Story ID missing",
          data: {},
        },
        {
          status: 400,
        }
      );
    }
  }),
  http.get("/users/:userId/stories", async ({ params }) => {
    const { userId } = params;
    if (userId) {
      return HttpResponse.json(
        {
          status: "success",
          data: MOCK_OTHER_USER_STORIES,
        },
        {
          status: 200,
        }
      );
    } else {
      return HttpResponse.json(
        {
          status: "fail",
          message: "User ID missing",
          data: {},
        },
        {
          status: 400,
        }
      );
    }
  }),
];
