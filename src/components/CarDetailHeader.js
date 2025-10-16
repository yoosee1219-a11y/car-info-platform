/**
 * 차량 상세 헤더 컴포넌트
 * 차량 기본 정보, 이미지, 네비게이션
 */

import React from "react";
import { Link } from "react-router-dom";

/**
 * 차량 상세 헤더 컴포넌트
 * @param {Object} car - 차량 정보
 * @param {Function} formatPrice - 가격 포맷팅 함수
 */
function CarDetailHeader({ car, formatPrice }) {
  if (!car) return null;

  return (
    <div className="car-detail-header">
      {/* 브레드크럼 */}
      <nav className="breadcrumb">
        <Link to="/">홈</Link>
        <span>›</span>
        <Link to="/">차량 정보</Link>
        <span>›</span>
        <span>
          {car.brand} {car.model}
        </span>
      </nav>

      <div className="header-content">
        <div className="car-images">
          <div className="main-image">
            <img
              src={car.images?.[0] || "/images/cars/placeholder.svg"}
              alt={`${car.brand} ${car.model}`}
              onError={(e) => {
                e.target.src = "/images/cars/placeholder.svg";
              }}
            />
          </div>
          <div className="thumbnail-images">
            {car.images?.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${car.brand} ${car.model} ${index + 1}`}
                onError={(e) => {
                  e.target.src = "/images/cars/placeholder.svg";
                }}
              />
            ))}
          </div>
        </div>

        <div className="car-info">
          <div className="car-title">
            <h1>
              {car.brand} {car.model}
              {car.trim && <span className="trim"> {car.trim}</span>}
            </h1>
            <p className="car-subtitle">
              {car.year}년형 • {car.fuelType} • {car.segment}
            </p>
          </div>

          <div className="price-section">
            <div className="price-new">
              <span className="price-label">신차 가격</span>
              <span className="price-value">{formatPrice(car.priceNew)}</span>
            </div>
            {car.priceUsed && (
              <div className="price-used">
                <span className="price-label">중고차 가격</span>
                <span className="price-value">
                  {formatPrice(car.priceUsed)}
                </span>
              </div>
            )}
          </div>

          <div className="quick-stats">
            <div className="stat">
              <span className="stat-label">연비</span>
              <span className="stat-value">
                {car.fuelEfficiency ? `${car.fuelEfficiency}km/L` : "-"}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">출력</span>
              <span className="stat-value">
                {car.power ? `${car.power}ps` : "-"}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">배기량</span>
              <span className="stat-value">
                {car.displacement ? `${car.displacement}cc` : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarDetailHeader);
