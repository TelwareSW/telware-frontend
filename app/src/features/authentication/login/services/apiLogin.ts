import { User } from "../LoginForm/LoginForm";

export async function login(user: User) {
  const res = await fetch("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
