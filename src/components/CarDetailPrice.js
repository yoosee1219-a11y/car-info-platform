/**
 * 차량 가격 비교 컴포넌트
 * 신차/중고차 가격, 렌터카/리스 견적 정보
 */

import React from "react";
import { Link } from "react-router-dom";

/**
 * 차량 가격 비교 컴포넌트
 * @param {Object} car - 차량 정보
 * @param {Function} formatPrice - 가격 포맷팅 함수
 */
function CarDetailPrice({ car, formatPrice }) {
  if (!car) return null;

  return (
    <div className="price-section">
      <h2>가격 정보</h2>

      <div className="price-comparison">
        <div className="price-cards">
          <div className="price-card new">
            <div className="price-header">
              <h3>신차 가격</h3>
              <span className="price-badge">NEW</span>
            </div>
            <div className="price-value">{formatPrice(car.priceNew)}</div>
            <p className="price-note">출고가 기준 (옵션 및 지역별 차이 있음)</p>
          </div>

          {car.priceUsed && (
            <div className="price-card used">
              <div className="price-header">
                <h3>중고차 가격</h3>
                <span className="price-badge">USED</span>
              </div>
              <div className="price-value">{formatPrice(car.priceUsed)}</div>
              <p className="price-note">
                시세 기준 (연식/주행거리별 차이 있음)
              </p>
            </div>
          )}
        </div>

        <div className="price-actions">
          <Link to="/comparison" className="btn btn-primary">
            렌터카 견적 받기
          </Link>
          <Link to="/comparison" className="btn btn-secondary">
            리스 견적 받기
          </Link>
          <Link to="/consultation" className="btn btn-outline">
            상담 신청
          </Link>
        </div>
      </div>

      <div className="price-info">
        <h3>가격 비교 팁</h3>
        <ul>
          <li>
            신차는 출고가 기준이며, 실제 구매 시 할인 혜택이 있을 수 있습니다.
          </li>
          <li>
            중고차 가격은 시세 기준이며, 실제 차량 상태에 따라 차이가 있습니다.
          </li>
          <li>
            렌터카와 리스는 계약 조건에 따라 월 비용이 달라질 수 있습니다.
          </li>
          <li>정확한 견적은 상담을 통해 확인하시기 바랍니다.</li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(CarDetailPrice);
