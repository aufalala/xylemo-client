import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
