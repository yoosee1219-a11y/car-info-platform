/**
 * SEO Head 컴포넌트
 * 동적 메타데이터 및 구조화된 데이터 관리
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setDynamicMeta, addStructuredData } from "../utils/seoHelper";

/**
 * 페이지별 SEO 설정
 */
const SEO_CONFIG = {
  "/": {
    title: "카인포 - 차량 정보 플랫폼 | 렌터카 리스 상담",
    description:
      "차량 정보부터 장기 렌터카/리스 상담까지, 모든 차량 정보를 한 곳에서 - 카인포. 현대, 기아, 제네시스 등 최신 차량 정보와 렌터카 비교 서비스 제공",
    keywords:
      "차량정보, 렌터카, 리스, 자동차비교, 현대차, 기아차, 제네시스, 장기렌터카, 리스상담, 차량스펙, 자동차가격, 신차정보",
  },
  "/posts": {
    title: "차량 정보 게시글 | 카인포",
    description: "차량 관련 유용한 정보와 팁을 제공하는 게시글 모음",
    keywords: "차량정보, 자동차팁, 렌터카가이드, 리스정보, 차량리뷰",
  },
  "/compare/auto": {
    title: "자동차보험 비교 | 카인포",
    description:
      "최적의 자동차보험을 찾아보세요. 다양한 보험사 상품을 한 번에 비교하고 최저가 보험을 찾아보세요.",
    keywords: "자동차보험, 보험비교, 자동차보험료, 보험가입, 보험할인",
  },
  "/compare/health": {
    title: "건강보험 비교 | 카인포",
    description:
      "건강보험 상품을 비교하고 나에게 맞는 최적의 건강보험을 찾아보세요.",
    keywords: "건강보험, 실손보험, 건강보험비교, 의료보험, 보험료",
  },
  "/compare/family": {
    title: "가족보험 비교 | 카인포",
    description:
      "가족을 위한 보험 상품을 비교하고 최적의 가족보험을 선택하세요.",
    keywords: "가족보험, 가족보험비교, 가족보험료, 가족보험가입",
  },
};

/**
 * SEO Head 컴포넌트
 */
function SEOHead({ title, description, keywords, image, url, structuredData }) {
  const location = useLocation();

  useEffect(() => {
    // 페이지별 기본 SEO 설정
    const pageConfig = SEO_CONFIG[location.pathname] || {};

    // 최종 SEO 설정 (props 우선, 페이지별 설정 fallback)
    const finalConfig = {
      title: title || pageConfig.title || "카인포 - 차량 정보 플랫폼",
      description:
        description ||
        pageConfig.description ||
        "차량 정보부터 장기 렌터카/리스 상담까지, 모든 차량 정보를 한 곳에서",
      keywords:
        keywords || pageConfig.keywords || "차량정보, 렌터카, 리스, 자동차비교",
      image: image || "https://carinfo.co.kr/images/cars/placeholder.svg",
      url: url || `https://carinfo.co.kr${location.pathname}`,
    };

    // 동적 메타데이터 설정
    setDynamicMeta({
      title: finalConfig.title,
      description: finalConfig.description,
      ogTitle: finalConfig.title,
      ogDescription: finalConfig.description,
      ogImage: finalConfig.image,
      ogUrl: finalConfig.url,
      twitterTitle: finalConfig.title,
      twitterDescription: finalConfig.description,
      twitterImage: finalConfig.image,
      canonical: finalConfig.url,
    });

    // 키워드 메타 태그 설정
    if (finalConfig.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", finalConfig.keywords);
      }
    }

    // 구조화된 데이터 추가
    if (structuredData) {
      addStructuredData(structuredData, "page-structured-data");
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    structuredData,
    location.pathname,
  ]);

  return null; // 렌더링할 내용 없음
}

export default SEOHead;
