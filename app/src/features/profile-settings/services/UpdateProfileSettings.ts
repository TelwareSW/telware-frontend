import { API_URL } from "@constants";
import { EditProfileForm } from "../ProfileSettings";

async function UpdateProfileSettings(newProfileSettings: EditProfileForm) {
  const res = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProfileSettings),
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}

export { UpdateProfileSettings };
