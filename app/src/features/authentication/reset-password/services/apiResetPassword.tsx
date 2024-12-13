import { API_URL } from "@constants";

export async function resetPassword({
  token,
  newPassword,
  confirmPassword,
}: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const requestObj = {
    password: newPassword,
    passwordConfirm: confirmPassword,
  };
  const result = await fetch(`${API_URL}/auth/password/reset/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },

    body: JSON.stringify(requestObj),
  });
  const data = await result.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
