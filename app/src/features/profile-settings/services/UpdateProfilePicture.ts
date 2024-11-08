import { API_URL } from "@constants";

async function UpdateProfilePicture(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await fetch(`${API_URL}/users/picture`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

export { UpdateProfilePicture };
