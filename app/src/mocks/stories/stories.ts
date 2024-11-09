import { http, HttpResponse } from "msw";
import { MOCK_MY_STORIES, MOCK_OTHER_USERS_STORIES } from "./mockStoriesData";
import { story } from "types/story";

type AddStoryRequestBody = {
  file: File;
  caption: string;
};

type AddStoryResponseBodySuccess = {
  status: "success";
  message: string;
  data: {};
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

  http.post<{}, AddStoryRequestBody, AddStoryResponseBody>(
    "/users/stories",
    async ({ request }) => {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const caption = formData.get("caption") as string;

      if (file) {
        const newStory: story = {
          id: String(MOCK_MY_STORIES.length + 1),
          content: URL.createObjectURL(file),
          timestamp: new Date().toISOString(),
          caption,
          views: [],
        };
        MOCK_MY_STORIES.push(newStory);
        return HttpResponse.json(
          {
            status: "success",
            message: "Story added successfully",
            data: newStory,
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
  http.delete("/users/stories", async ({ params }) => {
    const { storyId } = params;
    if (storyId) {
      const index = MOCK_MY_STORIES.findIndex(
        (story) => story.id === Number(storyId)
      );
      if (index !== -1) {
        MOCK_MY_STORIES.splice(index, 1);
      }
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

  http.get("/users/stories/me", async () => {
    return HttpResponse.json(
      {
        data: MOCK_MY_STORIES,
      },
      { status: 200 }
    );
  }),

  http.get("/users/stories", async () => {
    return HttpResponse.json(
      {
        data: MOCK_OTHER_USERS_STORIES,
      },
      {
        status: 200,
      }
    );
  }),
];
