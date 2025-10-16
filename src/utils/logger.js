/**
 * 로깅 유틸리티
 * 개발 환경과 프로덕션 환경을 구분하여 로깅
 */

/**
 * 개발 환경에서만 로그 출력
 * @param {...any} args - 로그할 인수들
 */
export const devLog = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

/**
 * 개발 환경에서만 에러 로그 출력
 * @param {...any} args - 로그할 인수들
 */
export const devError = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

/**
 * 개발 환경에서만 경고 로그 출력
 * @param {...any} args - 로그할 인수들
 */
export const devWarn = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
};

/**
 * 항상 출력되는 로그 (중요한 에러 등)
 * @param {...any} args - 로그할 인수들
 */
export const alwaysLog = (...args) => {
  console.log(...args);
};

/**
 * 프로덕션에서도 출력되는 에러 로그
 * @param {...any} args - 로그할 인수들
 */
export const alwaysError = (...args) => {
  console.error(...args);
};
