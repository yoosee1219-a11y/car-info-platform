import React, { useState } from "react";
import bcrypt from "bcryptjs";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 보안: 비밀번호는 해시화되어 저장 (실제 비밀번호: dbsdudgns0))
  // bcrypt로 생성된 해시값
  const ADMIN_USERNAME = "stryper11";
  const ADMIN_PASSWORD_HASH =
    "$2b$10$i/bbAAfAqrI5K./hKI13COuLm0QzgA3uqC8Lt2LnuHHwa9PZxHBki"; // dbsdudgns0) 의 해시

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 사용자명 확인
      if (username !== ADMIN_USERNAME) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      // 비밀번호 확인 (해시 비교)
      const isPasswordValid = await bcrypt.compare(
        password,
        ADMIN_PASSWORD_HASH
      );

      if (!isPasswordValid) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      // 로그인 성공
      // 안전한 토큰 생성 (실제로는 서버에서 JWT를 생성하지만, 간단한 구현)
      const loginToken = btoa(`${ADMIN_USERNAME}:${Date.now()}`);
      sessionStorage.setItem("adminToken", loginToken);
      sessionStorage.setItem("adminUser", ADMIN_USERNAME);

      onLoginSuccess();
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏦 인슈어팟</h1>
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
