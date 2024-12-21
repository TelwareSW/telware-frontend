import { API_URL } from "@constants";
import { User } from "../LoginForm/LoginForm";
import toast from "react-hot-toast";

export async function login(user: User) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-credentials": "true",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data = await res.json();
  if (data.status !== "success") {
    toast.error(data.message);
    throw new Error(data.message);
  }

  return data.data;
}
