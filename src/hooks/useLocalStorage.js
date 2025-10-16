/**
 * 로컬 스토리지 관리 Hook
 * 로컬 스토리지와 상태를 동기화하는 커스텀 훅
 */

import { useState, useEffect, useCallback } from "react";

/**
 * 로컬 스토리지 Hook
 * @param {string} key - 스토리지 키
 * @param {*} initialValue - 초기값
 * @returns {[*, Function]} [값, 설정 함수]
 */
export function useLocalStorage(key, initialValue) {
  // 초기값 가져오기
  const getInitialValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`로컬 스토리지 읽기 실패 (${key}):`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getInitialValue);

  // 값 설정 함수
  const setValue = useCallback(
    (value) => {
      try {
        // 함수인 경우 현재 값을 전달
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        // 로컬 스토리지에 저장
        if (valueToStore === undefined || valueToStore === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`로컬 스토리지 저장 실패 (${key}):`, error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key] // storedValue 의존성 제거
  );

  // 로컬 스토리지 변경 감지
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`로컬 스토리지 파싱 실패 (${key}):`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

/**
 * 세션 스토리지 Hook
 * @param {string} key - 스토리지 키
 * @param {*} initialValue - 초기값
 * @returns {[*, Function]} [값, 설정 함수]
 */
export function useSessionStorage(key, initialValue) {
  const getInitialValue = () => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`세션 스토리지 읽기 실패 (${key}):`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getInitialValue);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (valueToStore === undefined || valueToStore === null) {
          window.sessionStorage.removeItem(key);
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`세션 스토리지 저장 실패 (${key}):`, error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key] // storedValue 의존성 제거
  );

  return [storedValue, setValue];
}
