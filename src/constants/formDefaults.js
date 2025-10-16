/**
 * 폼 초기값 상수 정의
 * 폼 초기화 시 사용되는 기본값을 한 곳에서 관리
 */

import {
  DEFAULT_CATEGORY,
  DEFAULT_CAR_BRAND,
  DEFAULT_SERVICE_TYPE,
  DEFAULT_AVAILABLE_TIME,
} from "./car";
import { DEFAULT_REGION } from "./regions";

// 게시글 폼 초기값
export const POST_FORM_DEFAULTS = {
  title: "",
  category: DEFAULT_CATEGORY,
  content: "",
  is_published: false,
  view_count: 0,
  is_featured: false,
};

// 상담 문의 폼 초기값
export const CONSULTATION_FORM_DEFAULTS = {
  name: "",
  phone: "",
  email: "",
  car_brand: DEFAULT_CAR_BRAND,
  car_model: "",
  service_type: DEFAULT_SERVICE_TYPE,
  available_time: DEFAULT_AVAILABLE_TIME,
  region: DEFAULT_REGION,
  message: "",
};

// 댓글 폼 초기값
export const COMMENT_FORM_DEFAULTS = {
  author_name: "",
  author_password: "",
  content: "",
};

// 로그인 폼 초기값
export const LOGIN_FORM_DEFAULTS = {
  username: "",
  password: "",
};
