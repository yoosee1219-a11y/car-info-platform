/**
 * 인증 관리 Hook
 * 로그인/로그아웃 상태와 토큰 관리를 담당하는 커스텀 훅
 */

import { useState, useEffect, useCallback } from "react";
import { useSessionStorage } from "./useLocalStorage";

/**
 * 인증 Hook
 * @returns {Object} 인증 관련 상태와 함수들
 */
export function useAuthentication() {
  const [adminToken, setAdminToken] = useSessionStorage("adminToken", null);
  const [adminUser, setAdminUser] = useSessionStorage("adminUser", null);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = sessionStorage.getItem("adminToken");
        const user = sessionStorage.getItem("adminUser");

        // 값이 존재하고 유효한지 확인
        if (token && user && user !== "undefined" && user !== "null") {
          try {
            const parsedUser = JSON.parse(user);
            setAdminToken(token);
            setAdminUser(parsedUser);
          } catch (parseError) {
            console.error("사용자 데이터 파싱 오류:", parseError);
            // 손상된 데이터 정리
            sessionStorage.removeItem("adminToken");
            sessionStorage.removeItem("adminUser");
            setAdminToken(null);
            setAdminUser(null);
          }
        } else {
          // 유효하지 않은 데이터 정리
          if (token === "undefined" || token === "null") {
            sessionStorage.removeItem("adminToken");
          }
          if (user === "undefined" || user === "null") {
            sessionStorage.removeItem("adminUser");
          }
          setAdminToken(null);
          setAdminUser(null);
        }
      } catch (error) {
        console.error("인증 확인 중 오류:", error);
        // 모든 세션 스토리지 정리
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminUser");
        setAdminToken(null);
        setAdminUser(null);
      }

      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의존성 배열을 비워서 한 번만 실행

  // 로그인 함수
  const login = useCallback(
    (token, userData) => {
      setAdminToken(token);
      setAdminUser(userData);

      // 세션 스토리지에도 저장
      sessionStorage.setItem("adminToken", token);
      sessionStorage.setItem("adminUser", JSON.stringify(userData));
    },
    [setAdminToken, setAdminUser]
  );

  // 로그아웃 함수
  const logout = useCallback(() => {
    setAdminToken(null);
    setAdminUser(null);

    // 세션 스토리지에서 제거
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
  }, [setAdminToken, setAdminUser]);

  // 인증 상태 확인
  const isAuthenticated = Boolean(adminToken && adminUser);

  return {
    isAuthenticated,
    isLoading,
    adminToken,
    adminUser,
    login,
    logout,
  };
}
