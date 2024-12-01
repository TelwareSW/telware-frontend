import { API_URL, STATIC_MEDIA_URL } from "@constants";

export async function uploadFile(file: File | null) {
  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/chats/media`, {
    method: "POST",
    credentials: "include",
    body: formData,
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  const data = await response.json();

  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to upload file");
  }

  return STATIC_MEDIA_URL + data.data?.mediaFileName || "";
}
