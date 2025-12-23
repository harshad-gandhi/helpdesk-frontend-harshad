import type { ApiResponse } from "../interfaces/api-response";
import { getToken } from "./auth-service";

const BASE_URL = "http://localhost:5093/api";

async function handleResponse<T>(response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const messages = responseJson.messages;
    const errorMessage = messages?.join(", ") ?? "Request failed";
    throw new Error(errorMessage);
  }
  return responseJson.data;
}

export async function getAllAgents<T>(isActive: boolean) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/agents?&isActive=${isActive}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<T>(response);
}
export async function getAllPendingAgents<T>() {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/agents/invitations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<T>(response);
}
