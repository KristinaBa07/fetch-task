import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

// Define constants for error messages
const MSG_401 = "Session expired or unauthorized. Redirecting to login...";
const MSG_403 = "You do not have permission for this action.";
const MSG_404 = "Requested resource not found.";
const MSG_500 = "Server error occurred. Please try again later.";
const MSG_DEFAULT = "Unhandled status code";

export function setupAxiosInterceptors() {
  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {
      console.error(
        "[Response Error]",
        error.config?.url,
        error.response?.status,
        error.message
      );

      const status = error.response?.status;

      switch (status) {
        case 401:
          alert(MSG_401);
          localStorage.removeItem("authorized");
          window.location.href = "/login";
          break;

        case 403:
          alert(MSG_403);
          break;

        case 404:
          console.warn(MSG_404);
          break;

        case 500:
          alert(MSG_500);
          break;

        default:
          console.error(MSG_DEFAULT, status);
          break;
      }

      return Promise.reject(error);
    }
  );
}
