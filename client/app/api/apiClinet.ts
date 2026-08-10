/* eslint-disable */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Requests
 *
 * Attach access token to authenticated requests.
 */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Responses
 *
 * Handles expired access tokens.
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    /**
     * These endpoints should NOT trigger token refresh.
     *
     * A 401 here simply means the credentials are invalid.
     */
    const requestUrl = originalRequest?.url ?? "";

    const isAuthRequest =
      requestUrl.includes("/auth/signin") ||
      requestUrl.includes("/auth/signup") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh");

    /**
     * If the request is not a 401,
     * just return the original error.
     */
    if (status !== 401) {
      return Promise.reject(error);
    }

    /**
     * Login/signup/refresh 401s should go directly
     * back to the caller.
     *
     * This allows TanStack Query + Sonner to display
     * "Invalid phone or password" instead of redirecting.
     */
    if (isAuthRequest) {
      return Promise.reject(error);
    }

    /**
     * Prevent an infinite refresh loop.
     */
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refresh_token");

    /**
     * No refresh token means the user is no longer
     * authenticated.
     */
    if (!refreshToken) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(`${BASEURL}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const {
        access_token,
        expires_at,
        refresh_token: newRefreshToken,
      } = response.data;

      /**
       * Save the new access token.
       */
      localStorage.setItem("access_token", access_token);

      if (expires_at) {
        localStorage.setItem("expires_at", expires_at);
      }

      /**
       * If backend rotates refresh tokens,
       * save the new one.
       */
      if (newRefreshToken) {
        localStorage.setItem("refresh_token", newRefreshToken);
      }

      /**
       * Retry the original request with
       * the new access token.
       */
      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      /**
       * Refresh token is invalid/expired.
       */
      clearAuthAndRedirect();

      return Promise.reject(refreshError);
    }
  },
);

/**
 * Clear authentication data and redirect
 * the user to the login page.
 */
function clearAuthAndRedirect() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("token");

  /**
   * replace() prevents the user from going back
   * to the protected page using the browser back button.
   */
  window.location.replace("/login");
}

export default apiClient;
