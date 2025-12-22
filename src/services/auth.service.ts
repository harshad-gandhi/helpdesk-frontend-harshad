/* eslint-disable react-hooks/rules-of-hooks */
import { jwtDecode } from "jwt-decode";
import type { ApiResponse } from "../interfaces/api-response";
import type { LoginRequest } from "../interfaces/login-request";
import type { LoginResponse } from "../interfaces/login-response";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5093/api/auth";

async function handleResponse<T>(response: Response): Promise<T> {
  const response_json: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const messages = response_json.messages;
    const errorMessage = messages?.join(", ") ?? "Request failed";
    throw new Error(errorMessage);
  }

  return response_json.data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<LoginResponse>(response);
}

export async function refreshToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse<string>(response);
}

export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  return handleResponse(response);
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}
export function isTokenExpired(): boolean {
  const token = getToken();
  if (!token) return true;
  const decoded = jwtDecode(token);
  return Date.now() >= decoded["exp"]! * 1000;
}
export function isAuthenticated(): boolean {
  return !!getToken() && !isTokenExpired();
}

export function logout() {
  const navigate = useNavigate();

  localStorage.removeItem("authToken");
  navigate("/login");
}
