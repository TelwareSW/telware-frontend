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

type ViewStoryRequestBody = {
  data: story;
};
type ViewStoryResponseBodySuccess = {
  status: "success";
  message: string;
  data: {};
};
type ViewStoryResponseBodyFail = {
  status: "fail" | "error";
  message: string;
  data: {};
};

type ViewStoryResponseBody =
  | ViewStoryResponseBodySuccess
  | ViewStoryResponseBodyFail;

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
        const newStory = {
          id: String(MOCK_MY_STORIES.stories.length + 1),
          content: URL.createObjectURL(file),
          timestamp: new Date().toISOString(),
          caption,
          views: [],
        };
        MOCK_MY_STORIES.stories.push(newStory);
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
  http.post<{ storyId: string }, ViewStoryRequestBody, ViewStoryResponseBody>(
    "/stories/:storyId/views",
    async ({ params }) => {
      const { storyId } = params;

      let userIndex = -1;
      let storyIndex = -1;

      MOCK_OTHER_USERS_STORIES.some((user, uIndex) => {
        const sIndex = user.stories.findIndex((story) => story.id === storyId);
        if (sIndex !== -1) {
          userIndex = uIndex;
          storyIndex = sIndex;
          MOCK_OTHER_USERS_STORIES[userIndex].stories[storyIndex].viewed = true;
          return true;
        }
        return false;
      });

      if (userIndex !== -1 && storyIndex !== -1) {
        return HttpResponse.json(
          {
            status: "success",
            message: "Story view recorded successfully",
            data: MOCK_OTHER_USERS_STORIES[userIndex].stories[storyIndex]
              .viewed,
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
            message: "Story not found",
            data: {},
          },
          {
            status: 404,
          }
        );
      }
    }
  ),
  http.delete("/users/stories/:storyId", async ({ params }) => {
    const { storyId } = params;
    if (storyId) {
      const index = MOCK_MY_STORIES.stories.findIndex(
        (story) => story.id === storyId
      );
      if (index !== -1) {
        MOCK_MY_STORIES.stories.splice(index, 1);
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

  http.get("/users/stories", async () => {
    return HttpResponse.json(
      {
        data: MOCK_MY_STORIES,
      },
      { status: 200 }
    );
  }),

  http.get("/users/contacts/stories", async () => {
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
