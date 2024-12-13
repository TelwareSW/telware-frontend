import { API_URL } from "@constants";

async function DeleteProfilePicture() {
  const res = await fetch(`${API_URL}/users/picture`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  if (res.status === 204) {
    return { status: "success", message: "Story deleted successfully." };
  }

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data;
}

export { DeleteProfilePicture };
