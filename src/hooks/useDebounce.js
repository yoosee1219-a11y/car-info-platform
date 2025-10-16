/**
 * 디바운스 Hook
 * 입력값의 변화를 지연시켜 성능을 최적화하는 커스텀 훅
 */

import { useState, useEffect } from "react";

/**
 * 디바운스 Hook
 * @param {*} value - 디바운스할 값
 * @param {number} delay - 지연 시간 (밀리초)
 * @returns {*} 디바운스된 값
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 디바운스된 콜백 Hook
 * @param {Function} callback - 디바운스할 콜백 함수
 * @param {number} delay - 지연 시간 (밀리초)
 * @param {Array} deps - 의존성 배열
 * @returns {Function} 디바운스된 콜백 함수
 */
export function useDebouncedCallback(callback, delay, deps = []) {
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debouncedCallback = (...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(newTimer);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}
