/**
 * 윈도우 크기 감지 Hook
 * 브라우저 윈도우 크기 변화를 감지하는 커스텀 훅
 */

import { useState, useEffect } from "react";

/**
 * 윈도우 크기 Hook
 * @returns {Object} { width, height, isMobile, isTablet, isDesktop }
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // 윈도우 크기 업데이트 함수
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 초기 크기 설정
    handleResize();

    // 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 반응형 브레이크포인트 계산
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile,
    isTablet,
    isDesktop,
  };
}

/**
 * 미디어 쿼리 Hook
 * @param {string} query - CSS 미디어 쿼리 문자열
 * @returns {boolean} 쿼리 매치 여부
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // 초기 값 설정
    setMatches(mediaQuery.matches);

    // 변경 감지 함수
    const handleChange = (e) => {
      setMatches(e.matches);
    };

    // 이벤트 리스너 등록
    mediaQuery.addEventListener("change", handleChange);

    // 클린업
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
