import type { ApiResponse } from "../interfaces/api-response";
import type { LoginRequest } from "../interfaces/login-request";
import type { LoginResponse } from "../interfaces/login-response";

export async function login(payload: LoginRequest) {
  const response = await fetch("http://localhost:5093/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response_json: ApiResponse<LoginResponse> = await response.json();

  if (!response.ok) {
    const messages = response_json.messages;
    const errorMessage = messages ? messages.join(", ") : "Login failed";
    throw new Error(errorMessage);
  }

  return response_json.data;
}
