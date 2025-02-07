import { apiClient } from "../services/apiClient";
import { User } from "../models/userModel";

const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";

export async function loginUser(payload: User): Promise<void> {
    await apiClient.post(LOGIN, payload)
}

// POST /auth/logout
export async function logoutUser(): Promise<void> {
  await apiClient.post(LOGOUT);
}
