/**
 * 지역 관련 상수 정의
 * 상담 신청 시 사용되는 지역 정보를 관리
 */

// 지역 목록
export const REGIONS = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  INCHEON: "인천",
  BUSAN: "부산",
  DAEGU: "대구",
  GWANGJU: "광주",
  DAEJEON: "대전",
  ULSAN: "울산",
  SEJONG: "세종",
  GANGWON: "강원",
  CHUNGBUK: "충북",
  CHUNGNAM: "충남",
  JEONBUK: "전북",
  JEONNAM: "전남",
  GYEONGBUK: "경북",
  GYEONGNAM: "경남",
  JEJU: "제주",
};

// 지역 배열 (select 옵션용)
export const REGION_LIST = [
  REGIONS.SEOUL,
  REGIONS.GYEONGGI,
  REGIONS.INCHEON,
  REGIONS.BUSAN,
  REGIONS.DAEGU,
  REGIONS.GWANGJU,
  REGIONS.DAEJEON,
  REGIONS.ULSAN,
  REGIONS.SEJONG,
  REGIONS.GANGWON,
  REGIONS.CHUNGBUK,
  REGIONS.CHUNGNAM,
  REGIONS.JEONBUK,
  REGIONS.JEONNAM,
  REGIONS.GYEONGBUK,
  REGIONS.GYEONGNAM,
  REGIONS.JEJU,
];

// 기본 지역
export const DEFAULT_REGION = REGIONS.SEOUL;

