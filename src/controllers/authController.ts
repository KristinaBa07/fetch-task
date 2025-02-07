import { apiClient } from "../services/apiClient";
import { User } from "../models/userModel";

const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";

export async function loginUser(payload: User): Promise<{ token:string }> {
   await apiClient.post(LOGIN, payload);
   return {token:'testToken'}
}

// POST /auth/logout
export async function logoutUser(): Promise<void> {
  await apiClient.post(LOGOUT);
}
