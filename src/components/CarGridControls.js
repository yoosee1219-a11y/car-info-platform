/**
 * 차량 그리드 컨트롤 컴포넌트
 * 필터, 정렬, 비교 관련 UI 컨트롤
 */

import React from "react";
import CarFilter from "./CarFilter";

/**
 * 차량 그리드 컨트롤 컴포넌트
 * @param {Object} filters - 현재 필터 상태
 * @param {Function} setFilters - 필터 설정 함수
 * @param {Array} comparisonList - 비교 목록
 * @param {Function} clearComparison - 비교 목록 삭제 함수
 * @param {Function} goToComparison - 비교 페이지 이동 함수
 */
function CarGridControls({
  filters,
  setFilters,
  comparisonList,
  clearComparison,
  goToComparison,
}) {
  return (
    <div className="car-grid-controls">
      <CarFilter filters={filters} setFilters={setFilters} />

      {comparisonList.length > 0 && (
        <div className="comparison-bar">
          <div className="comparison-info">
            {comparisonList.length}대 선택됨
          </div>
          <button
            onClick={clearComparison}
            className="btn btn-secondary btn-sm"
          >
            전체 삭제
          </button>
          <button onClick={goToComparison} className="btn btn-primary btn-sm">
            비교하기
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(CarGridControls);
