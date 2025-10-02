/**
 * 유틸 함수 모음
 * 프로젝트 전체에서 사용되는 유틸리티 함수들을 export
 */

export * from "./contentParser";
export * from "./errorHandler";
export * from "./seoSchema";

/**
 * HTML 태그를 제거하고 순수 텍스트만 추출
 * @param {string} html - HTML 문자열
 * @param {number} maxLength - 최대 길이 (기본 150)
 * @returns {string} 순수 텍스트
 */
export function stripHtmlTags(html, maxLength = 150) {
  if (!html) return "";

  // HTML 엔티티 디코딩
  const decodeEntities = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  // HTML 태그 제거
  let text = html
    .replace(/<style[^>]*>.*?<\/style>/gi, "") // style 태그 제거
    .replace(/<script[^>]*>.*?<\/script>/gi, "") // script 태그 제거
    .replace(/<[^>]+>/g, "") // 모든 HTML 태그 제거
    .replace(/\s+/g, " ") // 연속 공백 제거
    .trim();

  // HTML 엔티티 디코딩
  text = decodeEntities(text);

  // 최대 길이로 자르기
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + "...";
  }

  return text;
}