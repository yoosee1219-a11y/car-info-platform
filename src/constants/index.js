/**
 * 상수 통합 export
 * 다른 파일에서 import 시 편의성을 위한 re-export
 */

// 차량 관련
export {
  CAR_BRANDS,
  CAR_BRAND_LIST,
  SERVICE_TYPES,
  SERVICE_TYPE_LIST,
  AVAILABLE_TIMES,
  AVAILABLE_TIME_LIST,
  POST_CATEGORIES,
  POST_CATEGORY_LIST,
  DEFAULT_CATEGORY,
  DEFAULT_CAR_BRAND,
  DEFAULT_SERVICE_TYPE,
  DEFAULT_AVAILABLE_TIME,
} from "./car";

// 지역 관련
export { REGIONS, REGION_LIST, DEFAULT_REGION } from "./regions";

// 상태 관련
export {
  CONSULTATION_STATUS,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_OPTIONS,
} from "./status";

// 메시지 관련
export {
  AUTH_MESSAGES,
  POST_MESSAGES,
  COMMENT_MESSAGES,
  CONSULTATION_MESSAGES,
  GENERAL_MESSAGES,
} from "./messages";

// 폼 기본값
export {
  POST_FORM_DEFAULTS,
  CONSULTATION_FORM_DEFAULTS,
  COMMENT_FORM_DEFAULTS,
  LOGIN_FORM_DEFAULTS,
} from "./formDefaults";

// AGO 패턴 관련
export * from "./agoPatterns";
