/**
 * 차량 비교 Hook
 * 비교 기능과 관련 상태 관리를 담당
 */

import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { CAR_MESSAGES } from "../constants/messages";

/**
 * 차량 비교 Hook
 * @returns {Object} { comparisonList, handleCompareToggle, clearComparison }
 */
export function useCarComparison() {
  const [comparisonList, setComparisonList] = useState([]);

  // 비교 담기/제거
  const handleCompareToggle = useCallback(
    (car) => {
      const isInList = comparisonList.some((c) => c.id === car.id);

      if (isInList) {
        setComparisonList(comparisonList.filter((c) => c.id !== car.id));
        toast.success(CAR_MESSAGES.COMPARISON_REMOVED);
      } else {
        if (comparisonList.length >= 3) {
          toast.error(CAR_MESSAGES.COMPARISON_LIMIT);
          return;
        }
        setComparisonList([...comparisonList, car]);
        toast.success(CAR_MESSAGES.COMPARISON_ADDED);
      }
    },
    [comparisonList]
  );

  // 비교 목록 전체 삭제
  const clearComparison = useCallback(() => {
    setComparisonList([]);
    toast.success(CAR_MESSAGES.COMPARISON_CLEAR);
  }, []);

  // 비교 페이지로 이동
  const goToComparison = useCallback(() => {
    toast.success(CAR_MESSAGES.COMPARISON_PAGE_PREP);
  }, []);

  return {
    comparisonList,
    handleCompareToggle,
    clearComparison,
    goToComparison,
  };
}
