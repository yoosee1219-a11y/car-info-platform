/**
 * 차량 그리드 리스트 컴포넌트
 * 필터링된 차량들을 그리드 형태로 렌더링
 */

import React from "react";
import CarCard from "./CarCard";

/**
 * 차량 그리드 리스트 컴포넌트
 * @param {Array} cars - 표시할 차량 배열
 * @param {Function} onCompareToggle - 비교 토글 핸들러
 * @param {Array} comparisonList - 비교 목록
 */
function CarGridList({ cars, onCompareToggle, comparisonList }) {
  if (cars.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>검색 결과가 없습니다</h3>
        <p>다른 조건으로 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className="car-grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onCompareToggle={onCompareToggle}
          isInComparison={comparisonList.some((c) => c.id === car.id)}
        />
      ))}
    </div>
  );
}

export default React.memo(CarGridList);
