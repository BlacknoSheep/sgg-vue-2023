import type { LoginResponse } from "./types";

const API_URL = "http://localhost:9001/api";

async function apiLogin(username: string, password: string): Promise<LoginResponse> {
  return await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
}

export { apiLogin };
