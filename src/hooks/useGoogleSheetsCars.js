/**
 * Google Sheets 차량 데이터 Hook
 * Google Sheets에서 차량 데이터를 가져와서 상태로 관리
 */

import { useState, useEffect } from "react";
import { fetchCarsFromGoogleSheets } from "../services/googleSheetsService";
import { SAMPLE_CARS } from "../constants/carData";

/**
 * Google Sheets에서 차량 데이터 로드
 * @returns {Object} { cars, loading, error, refresh }
 */
export function useGoogleSheetsCars() {
  const [cars, setCars] = useState(SAMPLE_CARS); // 기본값: 샘플 데이터
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useSheets, setUseSheets] = useState(false);

  const loadCars = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const sheetsCars = await fetchCarsFromGoogleSheets(forceRefresh);

      if (sheetsCars && sheetsCars.length > 0) {
        // Google Sheets 데이터 사용
        setCars(sheetsCars);
        setUseSheets(true);
        console.log("✅ Google Sheets 데이터 사용 중");
      } else {
        // Fallback: 샘플 데이터 사용
        setCars(SAMPLE_CARS);
        setUseSheets(false);
        console.log("⚠️ 샘플 데이터 사용 중 (Sheets 미설정 또는 빈 데이터)");
      }
    } catch (err) {
      console.error("차량 데이터 로드 실패:", err);
      setError(err.message);
      // 에러 시에도 샘플 데이터 사용
      setCars(SAMPLE_CARS);
      setUseSheets(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // 새로고침 함수 (강제 API 호출)
  const refresh = async () => {
    console.log("🔄 Google Sheets 데이터 새로고침 중... (API 호출)");
    await loadCars(true); // 강제 새로고침
    console.log("✅ Google Sheets 데이터 새로고침 완료");
  };

  return {
    cars,
    loading,
    error,
    refresh,
    useSheets, // Google Sheets 사용 여부
  };
}
