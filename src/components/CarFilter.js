import React, { useState } from "react";
import { FILTER_OPTIONS } from "../constants/carData";
import "./CarFilter.css";

/**
 * 차량 필터 컴포넌트
 * 브랜드, 차종, 연료, 가격, 정렬 등의 필터 UI
 */
function CarFilter({ onFilterChange, totalCount }) {
  const [filters, setFilters] = useState({
    brand: "전체",
    carType: "전체",
    fuelType: "전체",
    priceRange: "전체",
    sort: "popular",
    searchQuery: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      brand: "전체",
      carType: "전체",
      fuelType: "전체",
      priceRange: "전체",
      sort: "popular",
      searchQuery: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = Object.values(filters).filter(
    (v, i) => i < 4 && v !== "전체" && v !== ""
  ).length;

  return (
    <div className="car-filter">
      {/* 필터 헤더 */}
      <div className="filter-header">
        <div className="filter-title-wrapper">
          <h2 className="filter-title">🔍 차량 검색</h2>
          {totalCount !== undefined && (
            <span className="filter-count">
              {totalCount.toLocaleString()}대
            </span>
          )}
        </div>

        <div className="filter-header-actions">
          {activeFilterCount > 0 && (
            <button className="btn-reset" onClick={handleReset}>
              <span>🔄</span> 초기화 ({activeFilterCount})
            </button>
          )}
          <button
            className="btn-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "접기 ▲" : "펼치기 ▼"}
          </button>
        </div>
      </div>

      {/* 검색창 */}
      <div className="filter-search">
        <input
          type="text"
          placeholder="차량명 또는 브랜드로 검색... (예: 그랜저, 현대)"
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* 필터 그룹 */}
      <div className={`filter-groups ${isExpanded ? "expanded" : ""}`}>
        {/* 브랜드 */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🚗</span>
            브랜드
          </label>
          <div className="filter-options">
            {FILTER_OPTIONS.brands.map((brand) => (
              <button
                key={brand}
                className={`filter-chip ${
                  filters.brand === brand ? "active" : ""
                }`}
                onClick={() => handleFilterChange("brand", brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* 차종 */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🏎️</span>
            차종
          </label>
          <div className="filter-options">
            {FILTER_OPTIONS.carTypes.map((type) => (
              <button
                key={type}
                className={`filter-chip ${
                  filters.carType === type ? "active" : ""
                }`}
                onClick={() => handleFilterChange("carType", type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 연료 타입 */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">⛽</span>
            연료 타입
          </label>
          <div className="filter-options">
            {FILTER_OPTIONS.fuelTypes.map((fuel) => (
              <button
                key={fuel}
                className={`filter-chip ${
                  filters.fuelType === fuel ? "active" : ""
                }`}
                onClick={() => handleFilterChange("fuelType", fuel)}
              >
                {fuel}
              </button>
            ))}
          </div>
        </div>

        {/* 가격대 */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">💰</span>
            가격대 (신차 기준)
          </label>
          <div className="filter-options">
            {FILTER_OPTIONS.priceRanges.map((range) => (
              <button
                key={range.label}
                className={`filter-chip ${
                  filters.priceRange === range.label ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", range.label)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 정렬 */}
      <div className="filter-sort">
        <label className="sort-label">정렬</label>
        <select
          className="sort-select"
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
        >
          {FILTER_OPTIONS.sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default React.memo(CarFilter);
