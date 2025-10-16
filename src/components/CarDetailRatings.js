/**
 * 차량 평점 섹션 컴포넌트
 * 전체 평점과 세부 항목별 평점 표시
 */

import React from "react";

/**
 * 차량 평점 섹션 컴포넌트
 * @param {Object} car - 차량 정보
 */
function CarDetailRatings({ car }) {
  if (!car) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  const ratingCategories = [
    { label: "디자인", value: car.ratingDesign || 0 },
    { label: "성능", value: car.ratingPerformance || 0 },
    { label: "연비", value: car.ratingFuelEfficiency || 0 },
    { label: "편의성", value: car.ratingConvenience || 0 },
    { label: "안전성", value: car.ratingSafety || 0 },
    { label: "가성비", value: car.ratingValue || 0 },
  ];

  return (
    <div className="ratings-section">
      <h2>평점</h2>

      <div className="overall-rating">
        <div className="rating-score">
          <span className="score">
            {car.ratingOverall?.toFixed(1) || "0.0"}
          </span>
          <div className="stars">{renderStars(car.ratingOverall || 0)}</div>
        </div>
        <div className="rating-summary">
          <p>종합 평가</p>
          <p className="rating-text">
            {car.ratingOverall >= 4.5 && "매우 만족"}
            {car.ratingOverall >= 4.0 && car.ratingOverall < 4.5 && "만족"}
            {car.ratingOverall >= 3.5 && car.ratingOverall < 4.0 && "보통"}
            {car.ratingOverall >= 3.0 && car.ratingOverall < 3.5 && "아쉬움"}
            {car.ratingOverall < 3.0 && "불만족"}
          </p>
        </div>
      </div>

      <div className="category-ratings">
        {ratingCategories.map((category, index) => (
          <div key={index} className="rating-item">
            <div className="rating-label">{category.label}</div>
            <div className="rating-stars">{renderStars(category.value)}</div>
            <div className="rating-value">{category.value.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CarDetailRatings);
