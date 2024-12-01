import { http, HttpResponse } from "msw";

export const media = [
  http.post("/chats/media", async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return HttpResponse.json(
        {
          status: "error",
          message: "File is required or invalid",
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: "success",
        message: "File uploaded successfully",
        data: {
          mediaFileName: "af32509b11fdb42b.jpg",
        },
      },
      { status: 200 }
    );
  }),
];
