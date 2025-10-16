/**
 * AI 검색 최적화 유틸리티
 * AI 검색 엔진에 최적화된 콘텐츠 생성
 */

// import { devLog } from "./logger";

/**
 * AI 검색을 위한 키워드 추출
 * @param {Object} car - 차량 정보 객체
 * @returns {Array} 키워드 배열
 */
export function extractAIKeywords(car) {
  const _keywords = [
    // 기본 정보
    car.brand,
    car.model,
    car.trim,
    `${car.year}년형`,

    // 연료 및 차종
    car.fuelType,
    car.carType,

    // 가격 관련
    "신차가격",
    "렌터카가격",
    "리스가격",
    `${(car.priceNew / 10000).toFixed(0)}만원`,
    `${(car.priceRentalMonthly / 10000).toFixed(0)}만원`,

    // 성능 관련
    `${car.fuelEfficiency}km/L`,
    `${car.displacement}cc`,
    `${car.maxPower}마력`,
    `${car.maxTorque}kgf·m`,

    // AI 검색 친화적 키워드
    "자동차정보",
    "차량스펙",
    "렌터카비교",
    "리스비교",
    "차량리뷰",
    "자동차가격비교",
    "신차정보",
    "중고차정보",
    "차량구매가이드",
    "렌터카상담",
    "리스상담",

    // 브랜드별 키워드
    car.brand === "현대" ? ["현대차", "HYUNDAI", "현대자동차"] : [],
    car.brand === "기아" ? ["기아차", "KIA", "기아자동차"] : [],
    car.brand === "제네시스" ? ["GENESIS", "제네시스차량"] : [],

    // 차종별 키워드
    car.carType === "세단" ? ["세단", "승용차", "세단형"] : [],
    car.carType === "SUV" ? ["SUV", "스포츠유틸리티", "SUV차량"] : [],
    car.carType === "해치백" ? ["해치백", "해치백형"] : [],
    car.carType === "왜건" ? ["왜건", "왜건형"] : [],

    // 연료별 키워드
    car.fuelType === "가솔린" ? ["가솔린차", "휘발유차량"] : [],
    car.fuelType === "디젤" ? ["디젤차", "경유차량"] : [],
    car.fuelType === "하이브리드" ? ["하이브리드차", "HV", "혼합동력"] : [],
    car.fuelType === "전기" ? ["전기차", "EV", "전기자동차", "배터리차량"] : [],
  ]
    .flat()
    .filter(Boolean);

  return [...new Set(_keywords)]; // 중복 제거
}

/**
 * AI 검색을 위한 콘텐츠 생성
 * @param {Object} car - 차량 정보 객체
 * @returns {string} AI 친화적 콘텐츠
 */
export function generateAIContent(car) {
  const keywords = extractAIKeywords(car);

  return `
${car.brand} ${car.model} ${car.trim || ""} ${car.year}년형은 ${car.fuelType} ${
    car.carType
  }로, 
신차가격 ${(car.priceNew / 10000).toFixed(0)}만원, 렌터카 월납입금 ${(
    car.priceRentalMonthly / 10000
  ).toFixed(0)}만원, 
리스 월납입금 ${(car.priceLeaseMonthly / 10000).toFixed(0)}만원으로 제공됩니다.

연비는 ${car.fuelEfficiency}km/L로 ${
    car.fuelType
  } 차량 중 우수한 연비를 자랑하며, 
${car.displacement}cc 엔진에서 최대출력 ${car.maxPower}마력, 최대토크 ${
    car.maxTorque
  }kgf·m을 발휘합니다.

${car.carType} 차량으로 ${car.seats}인승이며, 트렁크 용량은 ${car.trunk}L입니다.
안전성은 ${car.airbags}개 에어백과 ${car.safetyRating}점 안전등급을 받았습니다.

장점: ${car.pros?.join(", ") || "우수한 연비와 안전성"}
단점: ${car.cons?.join(", ") || "높은 가격"}

${car.brand} ${car.model}는 ${car.year}년형 최신 모델로 ${
    car.fuelType
  } 차량의 대표 모델입니다.
렌터카와 리스 상담을 통해 최적의 조건으로 이용하실 수 있습니다.
`.trim();
}

/**
 * AI 검색을 위한 FAQ 생성
 * @param {Object} car - 차량 정보 객체
 * @returns {Array} FAQ 배열
 */
export function generateAIFAQ(car) {
  return [
    {
      question: `${car.brand} ${car.model} ${car.year}년형 신차가격은 얼마인가요?`,
      answer: `${car.brand} ${car.model} ${car.year}년형 신차가격은 ${(
        car.priceNew / 10000
      ).toFixed(0)}만원입니다.`,
    },
    {
      question: `${car.brand} ${car.model} 렌터카 월납입금은 얼마인가요?`,
      answer: `${car.brand} ${car.model} 렌터카 월납입금은 ${(
        car.priceRentalMonthly / 10000
      ).toFixed(0)}만원입니다.`,
    },
    {
      question: `${car.brand} ${car.model} 리스 월납입금은 얼마인가요?`,
      answer: `${car.brand} ${car.model} 리스 월납입금은 ${(
        car.priceLeaseMonthly / 10000
      ).toFixed(0)}만원입니다.`,
    },
    {
      question: `${car.brand} ${car.model} 연비는 얼마인가요?`,
      answer: `${car.brand} ${car.model} ${car.fuelType} 연비는 ${car.fuelEfficiency}km/L입니다.`,
    },
    {
      question: `${car.brand} ${car.model} ${car.fuelType} 차량인가요?`,
      answer: `네, ${car.brand} ${car.model}는 ${car.fuelType} 차량입니다.`,
    },
    {
      question: `${car.brand} ${car.model} ${car.carType} 차량인가요?`,
      answer: `네, ${car.brand} ${car.model}는 ${car.carType} 차량입니다.`,
    },
    {
      question: `${car.brand} ${car.model} 승차인원은 몇 명인가요?`,
      answer: `${car.brand} ${car.model}는 ${car.seats}인승 차량입니다.`,
    },
    {
      question: `${car.brand} ${car.model} 안전등급은 몇 점인가요?`,
      answer: `${car.brand} ${car.model} 안전등급은 ${car.safetyRating}점입니다.`,
    },
  ];
}

/**
 * AI 검색을 위한 메타 설명 생성
 * @param {Object} car - 차량 정보 객체
 * @returns {string} 메타 설명
 */
export function generateAIMetaDescription(car) {
  return `${car.brand} ${car.model} ${car.year}년형 ${car.fuelType} ${
    car.carType
  } 상세 정보. 신차가격 ${(car.priceNew / 10000).toFixed(
    0
  )}만원, 렌터카 월납입금 ${(car.priceRentalMonthly / 10000).toFixed(
    0
  )}만원, 리스 월납입금 ${(car.priceLeaseMonthly / 10000).toFixed(
    0
  )}만원, 연비 ${car.fuelEfficiency}km/L, ${car.displacement}cc 엔진, ${
    car.maxPower
  }마력, 최대토크 ${car.maxTorque}kgf·m, ${car.seats}인승, 트렁크 ${
    car.trunk
  }L, ${car.airbags}개 에어백, 안전등급 ${
    car.safetyRating
  }점 정보 제공. 렌터카 리스 상담 가능.`;
}

/**
 * AI 검색을 위한 제목 생성
 * @param {Object} car - 차량 정보 객체
 * @returns {string} SEO 제목
 */
export function generateAITitle(car) {
  return `${car.brand} ${car.model} ${car.trim || ""} ${
    car.year
  }년형 | 신차가격 ${(car.priceNew / 10000).toFixed(
    0
  )}만원 | 렌터카 리스 상담 | 카인포`;
}

/**
 * AI 검색을 위한 콘텐츠 최적화
 * @param {string} content - 원본 콘텐츠
 * @returns {string} 최적화된 콘텐츠
 */
export function optimizeForAI(content) {
  // AI 검색 친화적 키워드 추가
  const _aiKeywords = [
    "자동차정보",
    "차량스펙",
    "렌터카비교",
    "리스비교",
    "차량리뷰",
    "자동차가격비교",
    "신차정보",
    "중고차정보",
    "차량구매가이드",
    "렌터카상담",
    "리스상담",
    "차량비교",
    "자동차추천",
    "차량선택",
    "렌터카추천",
    "리스추천",
  ];

  // 키워드를 자연스럽게 콘텐츠에 포함
  let optimizedContent = content;

  // 문장 끝에 관련 키워드 추가
  if (!optimizedContent.includes("자동차정보")) {
    optimizedContent += " 자동차정보와 차량스펙을 확인하세요.";
  }

  if (!optimizedContent.includes("렌터카")) {
    optimizedContent += " 렌터카와 리스 상담을 통해 최적의 조건을 찾아보세요.";
  }

  return optimizedContent;
}

/**
 * FAQ 구조화된 데이터 생성
 * @param {Array} faqs - FAQ 배열
 * @returns {Object} 구조화된 FAQ 데이터
 */
export function generateFAQStructuredData(faqs) {
  if (!faqs || !Array.isArray(faqs)) {
    // devLog("FAQ 데이터가 없거나 배열이 아닙니다:", faqs);
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question || `질문 ${index + 1}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer || "답변이 제공되지 않았습니다.",
      },
    })),
  };

  // devLog("FAQ 구조화된 데이터 생성:", structuredData);
  return structuredData;
}
