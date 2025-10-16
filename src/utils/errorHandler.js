/**
 * 공통 에러 처리 유틸리티
 * API 호출 시 발생하는 에러를 일관되게 처리
 */

import toast from "react-hot-toast";
import { devError } from "./logger";

/**
 * API 에러를 처리하고 표준 결과 형식으로 반환
 * @param {Error} error - 에러 객체
 * @param {string} userMessage - 사용자에게 보여줄 메시지
 * @param {boolean} showToast - 토스트 표시 여부 (기본값: true)
 * @returns {Object} { success: false, error: string }
 */
export const handleApiError = (error, userMessage, showToast = true) => {
  // 콘솔에 상세 에러 로깅 (개발 환경에서만)
  devError(userMessage, error);

  // 에러 메시지 추출
  const errorMessage = error?.message || userMessage;

  // 사용자에게 토스트 메시지 표시
  if (showToast) {
    toast.error(errorMessage);
  }

  return {
    success: false,
    error: errorMessage,
  };
};

/**
 * API 호출 결과를 표준 형식으로 래핑
 * @param {any} data - 성공 시 반환할 데이터
 * @returns {Object} { success: true, data: any }
 */
export const createSuccessResult = (data) => {
  return {
    success: true,
    data,
  };
};

/**
 * 성공 메시지와 함께 결과 반환
 * @param {any} data - 성공 시 반환할 데이터
 * @param {string} message - 성공 메시지
 * @param {boolean} showToast - 토스트 표시 여부 (기본값: true)
 * @returns {Object} { success: true, data: any }
 */
export const createSuccessResultWithMessage = (
  data,
  message,
  showToast = true
) => {
  if (showToast && message) {
    toast.success(message);
  }

  return {
    success: true,
    data,
  };
};

/**
 * Supabase 응답을 체크하고 에러가 있으면 throw
 * @param {Object} response - Supabase 응답 { data, error }
 * @param {string} errorMessage - 에러 시 사용할 메시지
 * @returns {any} data
 * @throws {Error}
 */
export const checkSupabaseResponse = (response, errorMessage) => {
  if (response.error) {
    throw new Error(`${errorMessage}: ${response.error.message}`);
  }
  return response.data;
};
