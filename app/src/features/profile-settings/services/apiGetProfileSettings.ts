import { API_URL } from "@constants";

async function GetProfileSettings() {
  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  const user = data.data?.user;

  const profileSettings = {
    photo: user?.photo,
    firstName: user?.screenFirstName,
    lastName: user?.screenLastName,
    bio: user?.bio,
    username: user?.username,
    email: user?.email,
    phone: user?.phoneNumber,
    lastSeen: user?.status,
  };

  return profileSettings;
}

export { GetProfileSettings };
