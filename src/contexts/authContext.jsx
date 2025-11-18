import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  sessionLoading: true,
  authLoading: true,
  login: async () => {},
  logout: () => {},
  getToken: async () => null,
});

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
  const restoreSession = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (e) {
      console.error("Restore session failed:", e);
    } finally {
      setSessionLoading(false);
    }
  };

  restoreSession();
}, []);

  const login = useCallback(async (credentials) => {
    setAuthLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error("Login Failed");

      const data = await res.json();

      setAccessToken(data.accessToken);
      setUser(data.user);
      console.log(data.user);
    
    } catch (e) {
      console.error("Login failed:", e);
      throw e;

    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback( async () => {
    await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    setAccessToken(null);
    setUser(null);
  }, []);

  const getAccessToken = useCallback(async () => {
    if (!accessToken) return null;

    const decoded = jwtDecode(accessToken);
    const expiresAt = decoded.exp * 1000;
    const now = Date.now();

    if (expiresAt - now < 60 * 1000) {
      const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        logout();
        return null;
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      return data.accessToken;
    }

    return accessToken;
  }, [accessToken, logout]);


  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        sessionLoading,
        authLoading,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
