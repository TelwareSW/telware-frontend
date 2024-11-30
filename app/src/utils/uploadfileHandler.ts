import { API_URL, STATIC_MEDIA_URL } from "@constants";
import axios from "axios";

export async function uploadFileHandler(file: File | null): Promise<string> {
  if (!file) {
    console.error("No file provided");

    return "";
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/chats/media`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return STATIC_MEDIA_URL + response.data?.data?.mediaFileName || "";
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.message || error.message
    );

    return "";
  }
}
