/**
 * 인증 관련 API 서비스
 * 로그인, 비밀번호 변경 등 인증 관련 작업을 처리
 * admin_users 테이블 기반 인증 사용
 */

import { supabase, isSupabaseConfigured } from "../supabaseClient";
import bcrypt from "bcryptjs";

// 세션 스토리지 유틸리티 함수들
const saveSession = (token) => {
  try {
    sessionStorage.setItem("adminToken", token);
  } catch (error) {
    console.warn("세션 스토리지 저장 실패:", error);
  }
};

const loadSession = () => {
  try {
    return sessionStorage.getItem("adminToken");
  } catch (error) {
    console.warn("세션 스토리지 읽기 실패:", error);
    return null;
  }
};

const clearSession = () => {
  try {
    sessionStorage.removeItem("adminToken");
  } catch (error) {
    console.warn("세션 스토리지 삭제 실패:", error);
  }
};

const saveUserData = (userData) => {
  try {
    sessionStorage.setItem("adminUser", JSON.stringify(userData));
  } catch (error) {
    console.warn("사용자 데이터 저장 실패:", error);
  }
};

const loadUserData = () => {
  try {
    const data = sessionStorage.getItem("adminUser");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("사용자 데이터 읽기 실패:", error);
    return null;
  }
};

const clearUserData = () => {
  try {
    sessionStorage.removeItem("adminUser");
  } catch (error) {
    console.warn("사용자 데이터 삭제 실패:", error);
  }
};

export const authService = {
  async loginUser(username, password) {
    console.log(`🔐 로그인 시도: ${username}`);

    if (!isSupabaseConfigured) {
      console.log("📡 Supabase 미설정: 로그인 불가");
      return { success: false, error: "데이터베이스가 설정되지 않았습니다" };
    }

    console.log("📡 Supabase 설정 확인 완료");
    try {
      console.log("🔍 admin_users 테이블에서 사용자 조회 중...");

      // admin_users 테이블에서 username으로 사용자 조회
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !data) {
        console.error("❌ 사용자 조회 실패:", error?.message || "사용자 없음");
        return { success: false, error: "사용자를 찾을 수 없습니다" };
      }

      console.log("✅ 사용자 발견:", data.username);
      console.log("🔑 비밀번호 검증 중...");

      // bcrypt로 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(
        password,
        data.password_hash
      );

      if (!isPasswordValid) {
        console.warn("❌ 비밀번호 불일치");
        return { success: false, error: "비밀번호가 일치하지 않습니다" };
      }

      console.log("✅ 비밀번호 검증 성공!");

      // 토큰 생성 (간단하게 username을 Base64로 인코딩)
      const token = btoa(`${username}:${Date.now()}`);
      const userData = {
        id: data.id,
        username: data.username,
        role: "admin",
        created_at: data.created_at,
      };

      saveSession(token);
      saveUserData(userData);

      console.log("✅ 로그인 완료!");
      return { success: true, data: { token, user: userData } };
    } catch (error) {
      console.error("🚨 로그인 중 예외 발생:", error.message);
      return { success: false, error: error.message };
    }
  },

  async checkAuthStatus() {
    const token = loadSession();
    const userData = loadUserData();

    if (token && userData && userData.username) {
      console.log("✅ 인증 상태: 로그인됨", userData.username);
      return { isAuthenticated: true, user: userData };
    }

    console.log("❌ 인증 상태: 로그아웃");
    return { isAuthenticated: false, user: null };
  },

  async logoutUser() {
    clearSession();
    clearUserData();
    console.log("👋 로그아웃 완료");
    return { success: true };
  },
};
