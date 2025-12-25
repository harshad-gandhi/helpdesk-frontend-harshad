import type { InviteAgentRequest } from "../interfaces";
import type { ApiResponse } from "../interfaces/api-response";
import type UpdateAgentRequest from "../interfaces/update-agent-request";
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
export async function getAllDepartments<T>() {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/agents/departments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<T>(response);
}
export async function getAllReportsTos<T>(
  roleId: number,
  departmentId: number
) {
  const token = getToken();

  const url = new URL(`${BASE_URL}/agents/reports-to`);
  url.searchParams.append("roleId", roleId.toString());
  url.searchParams.append("departmentId", departmentId.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<T>(response);
}

export async function inviteAgent(payload: InviteAgentRequest) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/agents/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}
export async function updateAgent(payload: UpdateAgentRequest) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/agents/update-agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}
export async function deleteAgent(id: number) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/agents/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}
