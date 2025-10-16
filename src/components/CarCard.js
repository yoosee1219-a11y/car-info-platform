import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./CarCard.css";

/**
 * 차량 카드 컴포넌트
 * 메인 페이지 그리드에 표시되는 개별 차량 카드
 */
function CarCard({ car, onCompareToggle, isInComparison }) {
  const formatPrice = (price) => {
    if (!price) return "문의";
    return `${(price / 10000).toFixed(0)}만원`;
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>⭐</span>
        ))}
        {hasHalfStar && <span>⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`}>☆</span>
        ))}
      </>
    );
  };

  return (
    <div className="car-card">
      {/* 상단: 이미지 */}
      <Link to={`/car/${car.slug}`} className="car-card-image-wrapper">
        <img
          src={car.imageMain}
          alt={`${car.brand} ${car.model}`}
          className="car-card-image"
          onError={(e) => {
            e.target.src = "/images/cars/placeholder.svg";
          }}
        />

        {/* 배지 */}
        <div className="car-card-badges">
          {car.isFeatured && <span className="badge badge-featured">인기</span>}
          {car.isNew && <span className="badge badge-new">신차</span>}
          {car.isElectric && (
            <span className="badge badge-electric">전기차</span>
          )}
        </div>

        {/* 찜 버튼 */}
        <button
          className="car-card-favorite"
          onClick={(e) => {
            e.preventDefault();
            toast.success("찜 기능은 준비 중입니다!");
          }}
          title="찜하기"
        >
          🤍
        </button>
      </Link>

      {/* 중단: 차량 정보 */}
      <div className="car-card-content">
        <Link to={`/car/${car.slug}`} className="car-card-link">
          {/* 브랜드 & 모델 */}
          <h3 className="car-card-title">
            {car.brand} {car.model}
          </h3>

          {/* 트림 */}
          {car.trim && <p className="car-card-trim">{car.trim}</p>}

          {/* 평점 */}
          <div className="car-card-rating">
            <span className="rating-stars">
              {renderRatingStars(car.ratingOverall)}
            </span>
            <span className="rating-score">{car.ratingOverall}</span>
            <span className="rating-count">({car.reviewCount})</span>
          </div>

          {/* 스펙 요약 */}
          <div className="car-card-specs">
            <span className="spec-item">
              <span className="spec-icon">⛽</span>
              {car.fuelType}
            </span>
            <span className="spec-divider">|</span>
            <span className="spec-item">
              <span className="spec-icon">🚗</span>
              {car.carType}
            </span>
            <span className="spec-divider">|</span>
            <span className="spec-item">
              <span className="spec-icon">📊</span>
              {car.fuelType === "전기"
                ? `${car.fuelEfficiency} km/kWh`
                : `${car.fuelEfficiency} km/L`}
            </span>
          </div>
        </Link>

        {/* 가격 정보 */}
        <div className="car-card-prices">
          <div className="price-row">
            <span className="price-label">신차</span>
            <span className="price-value">{formatPrice(car.priceNew)}</span>
          </div>
          <div className="price-row price-highlight">
            <span className="price-label">렌터카 (월)</span>
            <span className="price-value price-main">
              {formatPrice(car.priceRentalMonthly)}
            </span>
          </div>
        </div>

        {/* 하단: 액션 버튼 */}
        <div className="car-card-actions">
          <Link to={`/car/${car.slug}`} className="btn btn-primary">
            자세히 보기
          </Link>
          <button
            className={`btn btn-outline ${isInComparison ? "btn-active" : ""}`}
            onClick={() => onCompareToggle(car)}
            title={isInComparison ? "비교에서 제거" : "비교 담기"}
          >
            {isInComparison ? "✓ 비교중" : "비교 담기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarCard);
