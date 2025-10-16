import React from "react";
import { useGoogleSheetsCars } from "../hooks/useGoogleSheetsCars";
import { useCarFilters } from "../hooks/useCarFilters";
import { useCarComparison } from "../hooks/useCarComparison";
import CarGridControls from "./CarGridControls";
import CarGridList from "./CarGridList";
import { CAR_MESSAGES } from "../constants/messages";
import "./CarGrid.css";

/**
 * 차량 그리드 컴포넌트
 * 필터링 + 차량 카드 그리드 전체 관리
 * Google Sheets 또는 샘플 데이터 사용
 */
function CarGrid() {
  const {
    cars: sheetsCars,
    loading,
    error,
    refresh,
    useSheets,
  } = useGoogleSheetsCars();

  // 커스텀 훅으로 로직 분리
  const { filters, setFilters, filteredCars } = useCarFilters(sheetsCars);
  const {
    comparisonList,
    handleCompareToggle,
    clearComparison,
    goToComparison,
  } = useCarComparison();

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">🔄</div>
        <p>{CAR_MESSAGES.LOADING_CARS}</p>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return <div className="error-banner">⚠️ {CAR_MESSAGES.SHEETS_ERROR}</div>;
  }

  return (
    <div className="car-grid-container">
      {/* Google Sheets 상태 표시 */}
      {useSheets && (
        <div className="sheets-indicator">
          <span className="sheets-badge">📊 Google Sheets 연동됨</span>
          <button className="btn-refresh" onClick={refresh} title="새로고침">
            🔄 새로고침
          </button>
        </div>
      )}

      {/* 필터 및 비교 컨트롤 */}
      <CarGridControls
        filters={filters}
        setFilters={setFilters}
        comparisonList={comparisonList}
        clearComparison={clearComparison}
        goToComparison={goToComparison}
      />

      {/* 차량 그리드 리스트 */}
      <CarGridList
        cars={filteredCars}
        onCompareToggle={handleCompareToggle}
        comparisonList={comparisonList}
      />
    </div>
  );
}

export default CarGrid;
