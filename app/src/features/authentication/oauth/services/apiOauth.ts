import { API_URL } from "@constants";

export async function apiGoogleOauth() {
  window.location.href = `${API_URL}/auth/oauth/google?platform=web`;
}

export async function apiGithubOauth() {
  window.location.href = `${API_URL}/auth/oauth/github?platform=web`;
}
