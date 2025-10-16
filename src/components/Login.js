import React, { useState } from "react";
import "./Login.css";
import { authService } from "../services/authService";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("stryper11");
  const [password, setPassword] = useState("dbsdudgns0)");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("🚀 [Login.js] handleSubmit 시작");
    e.preventDefault();
    console.log("🚀 [Login.js] preventDefault 완료");
    setError("");
    setIsLoading(true);
    console.log("🚀 [Login.js] 상태 업데이트 완료, authService 호출 시작");

    try {
      const result = await authService.loginUser(username, password);
      console.log("🚀 [Login.js] authService 결과:", result);

      if (result.success) {
        // 상위 래퍼에 상태 전달하여 즉시 인증 상태 업데이트
        onLoginSuccess(result.data.token, result.data.user);
      } else {
        console.warn("❌ [Login.js] 로그인 실패:", result.error);
        setError(result.error);
      }

      setIsLoading(false);
      console.log("🚀 [Login.js] handleSubmit 완료");
    } catch (error) {
      console.error("🔥 [Login.js] 예외 발생:", error);
      setError("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏦 보험이지</h1>
          <p>관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="login-footer">
          <p>🔒 보안 연결로 보호됩니다</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
