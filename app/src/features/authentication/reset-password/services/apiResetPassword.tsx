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
    newPassword: newPassword,
    confirmNewPassword: confirmPassword,
  };
  const result = await fetch(`${API_URL}/auth/password/reset/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(requestObj),
  });
  const data = await result.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
