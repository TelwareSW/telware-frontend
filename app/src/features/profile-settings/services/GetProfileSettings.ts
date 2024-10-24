async function GetProfileSettings() {
  const res = await fetch("users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  const profileSettings = {
    profilePicture: data.data.photo,
    firstName: data.data.firstName,
    lastName: data.data.lastName,
    bio: data.data.bio,
    username: data.data.username,
  };

  return profileSettings;
}

export { GetProfileSettings };
