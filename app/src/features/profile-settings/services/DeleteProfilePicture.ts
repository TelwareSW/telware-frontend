import { API_URL } from "@constants";

async function DeleteProfilePicture() {
  const res = await fetch(`${API_URL}/users/picture`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data;
}

export { DeleteProfilePicture };
