/**
 * 차량 상세 정보 Hook
 * 데이터 로딩, SEO 설정, 구조화된 데이터 생성
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleSheetsCars } from "./useGoogleSheetsCars";
import {
  generateCarStructuredData,
  addStructuredData,
  setDynamicMeta,
} from "../utils/seoHelper";
import {
  generateAITitle,
  generateAIMetaDescription,
  generateAIFAQ,
  generateFAQStructuredData,
} from "../utils/aiSearchOptimizer";
import { CAR_MESSAGES } from "../constants/messages";

/**
 * 차량 상세 정보 Hook
 * @returns {Object} { car, loading, error, faqs }
 */
export function useCarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, loading } = useGoogleSheetsCars();

  const [car, setCar] = useState(null);
  const [faqs, setFaqs] = useState([]);

  // 차량 데이터 로드
  useEffect(() => {
    if (!cars || cars.length === 0) return;

    const foundCar = cars.find((c) => c.id === parseInt(id));

    if (!foundCar) {
      toast.error(CAR_MESSAGES.NOT_FOUND);
      navigate("/");
      return;
    }

    setCar(foundCar);

    // FAQ 생성
    const generatedFAQs = generateAIFAQ(foundCar);
    setFaqs(generatedFAQs);

    // SEO 설정
    setupSEO(foundCar, generatedFAQs);
  }, [cars, id, navigate]);

  // SEO 설정 함수
  const setupSEO = (carData, faqData) => {
    try {
      // 동적 메타 태그 설정
      const title = generateAITitle(carData);
      const description = generateAIMetaDescription(carData);

      setDynamicMeta({
        title: `${title} | 차량 정보`,
        description,
        keywords: [
          carData.brand,
          carData.model,
          carData.trim,
          `${carData.year}년형`,
          carData.fuelType,
          "자동차정보",
          "차량스펙",
          "렌터카비교",
          "리스비교",
        ],
        ogTitle: title,
        ogDescription: description,
        ogImage: carData.images?.[0] || "/images/cars/placeholder.svg",
      });

      // 구조화된 데이터 추가
      const carStructuredData = generateCarStructuredData(carData);
      addStructuredData(carStructuredData);

      // FAQ 구조화된 데이터 추가
      if (faqData && faqData.length > 0) {
        const faqStructuredData = generateFAQStructuredData(faqData);
        if (faqStructuredData) {
          addStructuredData(faqStructuredData);
        }
      }
    } catch (error) {
      console.error("SEO 설정 중 오류:", error);
    }
  };

  // 가격 포맷팅
  const formatPrice = (price) => {
    if (!price) return "문의";
    return `${(price / 10000).toFixed(0)}만원`;
  };

  // 연비 포맷팅
  const formatFuelEfficiency = (efficiency) => {
    if (!efficiency) return "-";
    return `${efficiency}km/L`;
  };

  return {
    car,
    loading,
    faqs,
    formatPrice,
    formatFuelEfficiency,
  };
}
