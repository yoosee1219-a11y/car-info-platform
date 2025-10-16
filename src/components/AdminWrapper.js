import React from "react";
import Login from "./Login";
import Admin from "./Admin";
import { useAuthentication } from "../hooks/useAuthentication";

function AdminWrapper() {
  const { isAuthenticated, isLoading, login, logout } = useAuthentication();

  const handleLoginSuccess = (token, userData) => {
    login(token, userData);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f4f6",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "#6b7280" }}>로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Admin onLogout={logout} />;
}

export default AdminWrapper;
