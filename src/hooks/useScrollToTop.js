/**
 * 스크롤 관리 Hook
 * 페이지 스크롤과 관련된 기능들을 제공하는 커스텀 훅
 */

import { useState, useEffect, useCallback } from "react";

/**
 * 스크롤 위치 Hook
 * @returns {Object} { scrollY, scrollX, scrollToTop, scrollToBottom, isAtTop, isAtBottom }
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        scrollY: window.scrollY,
        scrollX: window.scrollX,
      });
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 초기 위치 설정
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 이동 함수들
  const scrollToTop = useCallback((behavior = "smooth") => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, []);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior,
    });
  }, []);

  const scrollToElement = useCallback(
    (element, behavior = "smooth", offset = 0) => {
      if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({ top: elementPosition, left: 0, behavior });
      }
    },
    []
  );

  // 스크롤 위치 체크
  const isAtTop = scrollPosition.scrollY === 0;
  const isAtBottom =
    scrollPosition.scrollY >=
    document.documentElement.scrollHeight - window.innerHeight;

  return {
    scrollY: scrollPosition.scrollY,
    scrollX: scrollPosition.scrollX,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    isAtTop,
    isAtBottom,
  };
}

/**
 * 스크롤 방향 감지 Hook
 * @returns {string} 'up' | 'down' | null
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
}

/**
 * 특정 요소가 화면에 보이는지 감지하는 Hook
 * @param {React.RefObject} ref - 감지할 요소의 ref
 * @param {Object} options - Intersection Observer 옵션
 * @returns {boolean} 요소가 화면에 보이는지 여부
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}
