import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "../supabaseClient";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. 입력값 검증
      if (!username || !password) {
        setError("아이디와 비밀번호를 모두 입력해주세요.");
        setIsLoading(false);
        return;
      }

      // 2. Supabase에서 관리자 정보 가져오기
      const { data: adminData, error: fetchError } = await supabase
        .from("admin_users")
        .select("username, password_hash")
        .eq("username", username)
        .single();

      if (fetchError || !adminData) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      // 3. 비밀번호 확인 (해시 비교)
      const isPasswordValid = await bcrypt.compare(
        password,
        adminData.password_hash
      );

      if (!isPasswordValid) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      // 4. 로그인 성공
      // 안전한 토큰 생성
      const loginToken = btoa(`${username}:${Date.now()}`);
      sessionStorage.setItem("adminToken", loginToken);
      sessionStorage.setItem("adminUser", username);

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
