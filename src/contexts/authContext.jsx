import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  getToken: async () => null,
});

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  // const [tokenExpiry, setTokenExpiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");
  //   const storedExpiry = localStorage.getItem("tokenExpiry");

  //   if (storedUser) setUser(JSON.parse(storedUser));
  //   if (storedToken) setToken(storedToken);
  //   if (storedExpiry) setTokenExpiry(Number(storedExpiry));

  //   setIsLoading(false);
  // }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const res = await fetch("localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error("Login Failed");

      const data = await res.json();

      setAccessToken(data.accessToken);
      setUser(data.user);

      // localStorage.setItem("user", JSON.stringify(data.user));
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("tokenExpiry", Date.now() + data.expiresIn * 1000);
    
    } catch (e) {
      console.error("Login failed:", e);
      throw e;

    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback( async () => {
    await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    setAccessToken(null);
    setUser(null);
    // setUser(null);
    // setToken(null);
    // setTokenExpiry(null);

    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("tokenExpiry");
  }, []);

//   const getToken = useCallback(async () => {
//   if (!token) return null;

//   const now = Date.now();

//   if (!tokenExpiry || now > tokenExpiry - 30000) {
//     try {
//       const res = await fetch("localhost:3000/api/auth/refresh-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to refresh token");

//       const data = await res.json();
//       setToken(data.token);
//       setTokenExpiry(Date.now() + data.expiresIn * 1000);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("tokenExpiry", Date.now() + data.expiresIn * 1000);

//       return data.token;
//     } catch (err) {
//       console.error("Token refresh failed:", err);
//       logout();
//       return null;
//     }
//   }

//   return token;
// }, [token, tokenExpiry, logout]);

  const getAccessToken = useCallback(async () => {
    if (!accessToken) return null;

    const decoded = jwtDecode(accessToken);
    const expiresAt = decoded.exp * 1000;
    const now = Date.now();

    if (expiresAt - now < 60 * 1000) {
      const res = await fetch("localhost:3000/api/auth/refresh-token", {
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
        isLoading,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
