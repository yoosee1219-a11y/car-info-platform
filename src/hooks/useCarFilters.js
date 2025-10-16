/**
 * 차량 필터링 Hook
 * 필터링 로직과 정렬 기능을 담당
 */

import { useState, useMemo } from "react";
import { FILTER_OPTIONS } from "../constants/carData";

/**
 * 차량 필터링 Hook
 * @param {Array} cars - 전체 차량 데이터
 * @returns {Object} { filters, setFilters, filteredCars }
 */
export function useCarFilters(cars) {
  const [filters, setFilters] = useState({
    brand: "전체",
    carType: "전체",
    fuelType: "전체",
    priceRange: "전체",
    sort: "popular",
    searchQuery: "",
  });

  // 필터링 로직
  const filteredCars = useMemo(() => {
    let result = [...cars];

    // 검색어 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.trim?.toLowerCase().includes(query)
      );
    }

    // 브랜드 필터
    if (filters.brand !== "전체") {
      result = result.filter((car) => car.brand === filters.brand);
    }

    // 차종 필터
    if (filters.carType !== "전체") {
      if (filters.carType === "전기차") {
        result = result.filter((car) => car.isElectric);
      } else {
        result = result.filter((car) => car.carType === filters.carType);
      }
    }

    // 연료 타입 필터
    if (filters.fuelType !== "전체") {
      result = result.filter((car) => car.fuelType === filters.fuelType);
    }

    // 가격대 필터
    if (filters.priceRange !== "전체") {
      const priceRange = FILTER_OPTIONS.priceRanges.find(
        (r) => r.label === filters.priceRange
      );
      if (priceRange) {
        result = result.filter(
          (car) =>
            car.priceNew >= priceRange.min && car.priceNew <= priceRange.max
        );
      }
    }

    // 정렬
    switch (filters.sort) {
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      case "price-asc":
        result.sort((a, b) => a.priceNew - b.priceNew);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNew - a.priceNew);
        break;
      case "rating":
        result.sort((a, b) => b.ratingOverall - a.ratingOverall);
        break;
      case "recent":
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return result;
  }, [filters, cars]);

  return {
    filters,
    setFilters,
    filteredCars,
  };
}
