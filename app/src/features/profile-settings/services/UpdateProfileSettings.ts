import { API_URL } from "@constants";
import { EditProfileForm } from "../ProfileSettings";

async function UpdateProfileSettings(newProfileSettings: EditProfileForm) {
  const formattedNewProfileSettings = {
    screenFirstName: newProfileSettings.firstName,
    screenLastName: newProfileSettings.lastName,
    username: newProfileSettings.username,
    bio: newProfileSettings.bio,
    phoneNumber: newProfileSettings.phone,
    email: newProfileSettings.email,
  };

  const res = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    body: JSON.stringify(formattedNewProfileSettings),
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}

export { UpdateProfileSettings };
