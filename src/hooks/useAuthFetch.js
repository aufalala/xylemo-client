import { useCallback } from "react";
import { useAuth } from "./useAuth.js";
import { localServerURL, serverURL } from "../utils/urlConfig.js";

export function useAuthFetch() {
  const { getAccessToken, isAuthenticated, authLoading } = useAuth();

  const fetchWithAuth = useCallback(
    async (path, options = {}, withAuth = false) => {
      if (withAuth) {
        if (authLoading) {
          throw new Error("Auth is still loading");
        }
        if (!isAuthenticated) {
          throw new Error("User is not signed in.");
        }
      }

      let token = null;
      if (withAuth) {
        token = await getAccessToken();
        if (!token) throw new Error("Unable to get token");
      }

      const finalOptions = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const baseURL = import.meta.env.DEV ? localServerURL : serverURL;
      const res = await fetch(`${baseURL}${path}`, finalOptions);

      if (!res.ok) throw new Error("Server response not ok");

      const contentType = res.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        return await res.json();
      } else {
        const text = await res.text();
        console.warn(`Expected JSON, got:`, text);
        throw new Error("Expected JSON response");
      }
    },
    [getAccessToken, isAuthenticated, authLoading]
  );

  return { fetchWithAuth };
}
