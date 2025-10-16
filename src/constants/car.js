/**
 * 차량 관련 상수 정의
 * One Source of Truth 원칙에 따라 차량 브랜드, 서비스 타입 등을 한 곳에서 관리
 */

// 차량 브랜드
export const CAR_BRANDS = {
  HYUNDAI: "현대",
  KIA: "기아",
  GENESIS: "제네시스",
  CHEVROLET: "쉐보레",
  RENAULT: "르노",
  SSANGYONG: "쌍용",
  BENZ: "벤츠",
  BMW: "BMW",
  AUDI: "아우디",
  TOYOTA: "도요타",
  LEXUS: "렉서스",
  VOLKSWAGEN: "폭스바겐",
  PEUGEOT: "푸조",
  VOLVO: "볼보",
  LAND_ROVER: "랜드로버",
  PORSCHE: "포르쉐",
  TESLA: "테슬라",
  ETC: "기타",
};

// 차량 브랜드 배열 (select 옵션용)
export const CAR_BRAND_LIST = [
  CAR_BRANDS.HYUNDAI,
  CAR_BRANDS.KIA,
  CAR_BRANDS.GENESIS,
  CAR_BRANDS.CHEVROLET,
  CAR_BRANDS.RENAULT,
  CAR_BRANDS.SSANGYONG,
  CAR_BRANDS.BENZ,
  CAR_BRANDS.BMW,
  CAR_BRANDS.AUDI,
  CAR_BRANDS.TOYOTA,
  CAR_BRANDS.LEXUS,
  CAR_BRANDS.VOLKSWAGEN,
  CAR_BRANDS.PEUGEOT,
  CAR_BRANDS.VOLVO,
  CAR_BRANDS.LAND_ROVER,
  CAR_BRANDS.PORSCHE,
  CAR_BRANDS.TESLA,
  CAR_BRANDS.ETC,
];

// 서비스 타입
export const SERVICE_TYPES = {
  RENTAL: "장기 렌터카",
  LEASE: "리스",
  BOTH: "렌터카/리스 모두 상담",
};

// 서비스 타입 배열
export const SERVICE_TYPE_LIST = [
  SERVICE_TYPES.RENTAL,
  SERVICE_TYPES.LEASE,
  SERVICE_TYPES.BOTH,
];

// 통화 가능 시간
export const AVAILABLE_TIMES = {
  MORNING: "오전 (09:00-12:00)",
  AFTERNOON: "오후 (12:00-18:00)",
  EVENING: "저녁 (18:00-21:00)",
  ANYTIME: "언제든지",
};

// 통화 가능 시간 배열
export const AVAILABLE_TIME_LIST = [
  AVAILABLE_TIMES.MORNING,
  AVAILABLE_TIMES.AFTERNOON,
  AVAILABLE_TIMES.EVENING,
  AVAILABLE_TIMES.ANYTIME,
];

// 게시글 카테고리
export const POST_CATEGORIES = {
  CAR_INFO: "차량 정보",
  RENTAL_GUIDE: "렌터카 가이드",
  LEASE_GUIDE: "리스 가이드",
  COMPARISON: "차량 비교",
  TIPS: "절약 팁",
  MAINTENANCE: "차량 관리",
  FAQ: "FAQ",
};

// 게시글 카테고리 배열
export const POST_CATEGORY_LIST = [
  POST_CATEGORIES.CAR_INFO,
  POST_CATEGORIES.RENTAL_GUIDE,
  POST_CATEGORIES.LEASE_GUIDE,
  POST_CATEGORIES.COMPARISON,
  POST_CATEGORIES.TIPS,
  POST_CATEGORIES.MAINTENANCE,
  POST_CATEGORIES.FAQ,
];

// 기본 카테고리
export const DEFAULT_CATEGORY = POST_CATEGORIES.CAR_INFO;

// 기본 차량 브랜드
export const DEFAULT_CAR_BRAND = CAR_BRANDS.HYUNDAI;

// 기본 서비스 타입
export const DEFAULT_SERVICE_TYPE = SERVICE_TYPES.BOTH;

// 기본 통화 가능 시간
export const DEFAULT_AVAILABLE_TIME = AVAILABLE_TIMES.ANYTIME;

