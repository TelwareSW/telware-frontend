import { STATIC_MEDIA_URL } from "@constants";
import { http, HttpResponse } from "msw";

export const profilePictureMock = [
  http.get(/.*\.(png|jpg|jpeg|gif|svg)$/, async () => {
    return undefined;
  }),

  http.delete("/users/picture", async () => {
    return HttpResponse.json(
      {
        status: "success",
        data: {},
      },
      { status: 200 },
    );
  }),
  http.patch("/users/picture", async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (file instanceof File && /\.(png|jpg|jpeg|gif|svg)$/i.test(file.name)) {
      return HttpResponse.json(
        {
          status: "success",
          message: "Image uploaded successfully",
          data: {
            imageUrl: `${STATIC_MEDIA_URL}/${file.name}`,
          },
        },
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } else {
      return HttpResponse.json(
        {
          status: "fail",
          message: "Invalid file type or missing file",
          data: {},
        },
        {
          status: 400,
        },
      );
    }
  }),
];
