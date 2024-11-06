async function getBlockList() {
  const response = await fetch("/users/block", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data.users;
  } else {
    throw new Error(data.message);
  }
}

export default getBlockList;
