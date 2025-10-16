import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCarDetail } from "../hooks/useCarDetail";
import CarDetailHeader from "./CarDetailHeader";
import CarDetailSpecs from "./CarDetailSpecs";
import CarDetailRatings from "./CarDetailRatings";
import CarDetailProsCons from "./CarDetailProsCons";
import CarDetailPrice from "./CarDetailPrice";
import CarDetailFAQ from "./CarDetailFAQ";
import "./CarDetail.css";

/**
 * 차량 상세 페이지
 * 재원 정보, 평점, 장단점, 가격 비교 등 표시
 */
function CarDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("specs");

  // 커스텀 훅으로 데이터 로딩 및 SEO 처리
  const { car, loading, faqs, formatPrice, formatFuelEfficiency } =
    useCarDetail();

  // 로딩 상태
  if (loading) {
    return (
      <div className="car-detail-loading">
        <div className="loading-spinner">🔄</div>
        <p>차량 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 차량이 없을 때
  if (!car) {
    return (
      <div className="car-detail-error">
        <h2>차량 정보를 찾을 수 없습니다</h2>
        <p>요청하신 차량 정보가 존재하지 않습니다.</p>
      </div>
    );
  }

  // 탭 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case "specs":
        return (
          <CarDetailSpecs
            car={car}
            formatPrice={formatPrice}
            formatFuelEfficiency={formatFuelEfficiency}
          />
        );
      case "ratings":
        return <CarDetailRatings car={car} />;
      case "pros-cons":
        return <CarDetailProsCons car={car} />;
      case "price":
        return <CarDetailPrice car={car} formatPrice={formatPrice} />;
      case "faq":
        return <CarDetailFAQ faqs={faqs} />;
      default:
        return null;
    }
  };

  return (
    <div className="car-detail">
      {/* 헤더 */}
      <CarDetailHeader car={car} formatPrice={formatPrice} />

      {/* 탭 메뉴 */}
      <div className="car-tabs">
        <button
          className={`tab-button ${activeTab === "specs" ? "active" : ""}`}
          onClick={() => setActiveTab("specs")}
        >
          📋 재원정보
        </button>
        <button
          className={`tab-button ${activeTab === "ratings" ? "active" : ""}`}
          onClick={() => setActiveTab("ratings")}
        >
          ⭐ 평점
        </button>
        <button
          className={`tab-button ${activeTab === "pros-cons" ? "active" : ""}`}
          onClick={() => setActiveTab("pros-cons")}
        >
          ✅ 장단점
        </button>
        <button
          className={`tab-button ${activeTab === "price" ? "active" : ""}`}
          onClick={() => setActiveTab("price")}
        >
          💰 가격비교
        </button>
        <button
          className={`tab-button ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          ❓ FAQ
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="car-tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default CarDetail;
