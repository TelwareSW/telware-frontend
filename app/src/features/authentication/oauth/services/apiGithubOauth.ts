import { API_URL } from "@constants";

export async function apiGithubOauth() {
  console.log('here');
  const res = await fetch(`${API_URL}/auth/oauth/github`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "true",
    },
  });

  const data = await res.json();
  console.log(data);

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
