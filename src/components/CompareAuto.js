import React, { useState } from "react";
import "./CompareAuto.css";

const CompareAuto = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    "대인배상Ⅰ",
    "대인배상Ⅱ",
    "대물배상",
    "자기신체사고",
    "자기차량손해",
    "무보험차상해",
  ];

  const discountOptions = [
    "블랙박스 할인",
    "안전운전 할인",
    "저공해차 할인",
    "주행거리 할인",
    "자녀할인",
    "하이브리드 할인",
  ];

  const toggleFilter = (category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const insuranceData = [
    {
      id: 1,
      company: "삼성화재",
      logo: "🛡️",
      monthlyPremium: "87,000",
      rating: 4.5,
      reviews: 1234,
      coverage: [
        { name: "대인배상Ⅰ", amount: "무한" },
        { name: "대인배상Ⅱ", amount: "1억원" },
        { name: "대물배상", amount: "2천만원" },
        { name: "자기신체사고", amount: "1억원" },
        { name: "자기차량손해", amount: "시가 기준" },
      ],
      specialties: [
        "24시간 긴급출동 서비스",
        "렌터카 무료 제공 (3일)",
        "전국 정비망 보유",
      ],
      discounts: ["블랙박스 할인 5%", "안전운전 할인 10%", "장기우수 할인 7%"],
      color: "#1E40AF",
    },
    {
      id: 2,
      company: "현대해상",
      logo: "🚗",
      monthlyPremium: "82,500",
      rating: 4.3,
      reviews: 987,
      coverage: [
        { name: "대인배상Ⅰ", amount: "무한" },
        { name: "대인배상Ⅱ", amount: "1억원" },
        { name: "대물배상", amount: "2천만원" },
        { name: "자기신체사고", amount: "1억원" },
        { name: "자기차량손해", amount: "시가 기준" },
      ],
      specialties: [
        "다이렉트 전문 상담사",
        "AI 사고처리 시스템",
        "보험료 자동절감 알림",
      ],
      discounts: ["주행거리 할인 8%", "자녀할인 3%", "하이브리드 할인 5%"],
      color: "#059669",
    },
    {
      id: 3,
      company: "DB손해보험",
      logo: "⚡",
      monthlyPremium: "79,900",
      rating: 4.4,
      reviews: 756,
      coverage: [
        { name: "대인배상Ⅰ", amount: "무한" },
        { name: "대인배상Ⅱ", amount: "1억원" },
        { name: "대물배상", amount: "2천만원" },
        { name: "자기신체사고", amount: "1억원" },
        { name: "자기차량손해", amount: "시가 기준" },
      ],
      specialties: [
        "프리미엄 고객센터",
        "사고 시 전문변호사 자문",
        "해외여행 자동차보험 연계",
      ],
      discounts: [
        "저공해차 할인 7%",
        "안전운전 할인 10%",
        "온라인 가입 할인 5%",
      ],
      color: "#DC2626",
    },
  ];

  const scrollToConsultation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="compare-auto-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🚗 자동차보험 한눈에 비교하기</h1>
          <p>
            주요 보험사의 자동차보험을 비교하고 나에게 맞는 상품을 찾아보세요
          </p>
        </div>
      </div>

      <div className="compare-container">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <h3>🎯 필요한 보장</h3>
            <div className="filter-chips">
              {coverageOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-chip ${
                    selectedFilters.coverage.includes(option) ? "active" : ""
                  }`}
                  onClick={() => toggleFilter("coverage", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>💰 할인 조건</h3>
            <div className="filter-chips">
              {discountOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-chip ${
                    selectedFilters.discounts.includes(option) ? "active" : ""
                  }`}
                  onClick={() => toggleFilter("discounts", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="comparison-grid">
          {insuranceData.map((insurance) => (
            <div key={insurance.id} className="insurance-card">
              <div
                className="card-header"
                style={{ borderTopColor: insurance.color }}
              >
                <div className="company-info">
                  <span className="company-logo">{insurance.logo}</span>
                  <h2>{insurance.company}</h2>
                </div>
                <div className="rating">
                  <span className="stars">
                    {"⭐".repeat(Math.floor(insurance.rating))}
                  </span>
                  <span className="rating-text">
                    {insurance.rating} ({insurance.reviews.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="premium-section">
                <div className="premium-label">예상 월 보험료</div>
                <div className="premium-amount">
                  {insurance.monthlyPremium}원
                </div>
                <div className="premium-note">
                  * 개인 조건에 따라 다를 수 있습니다
                </div>
              </div>

              <div className="coverage-section">
                <h3>📋 보장 내용</h3>
                <ul className="coverage-list">
                  {insurance.coverage.map((item, idx) => (
                    <li key={idx}>
                      <span className="coverage-name">{item.name}</span>
                      <span className="coverage-amount">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="specialty-section">
                <h3>✨ 주요 특징</h3>
                <ul className="specialty-list">
                  {insurance.specialties.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="discount-section">
                <h3>🎁 적용 가능 할인</h3>
                <div className="discount-tags">
                  {insurance.discounts.map((discount, idx) => (
                    <span key={idx} className="discount-tag">
                      {discount}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="consult-button"
                style={{ backgroundColor: insurance.color }}
                onClick={scrollToConsultation}
              >
                상담 신청하기
              </button>
            </div>
          ))}
        </div>

        {/* Info Notice */}
        <div className="info-notice">
          <h3>💡 보험료는 이렇게 결정돼요</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🚙</span>
              <div>
                <strong>차량 정보</strong>
                <p>차종, 연식, 용도</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👤</span>
              <div>
                <strong>운전자 정보</strong>
                <p>나이, 경력, 사고이력</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>지역</strong>
                <p>주 사용지역, 주차장소</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <strong>보장 범위</strong>
                <p>가입 특약, 자기부담금</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 내 차에 딱 맞는 보험료가 궁금하다면?</h2>
          <p>1분만에 무료 견적을 받아보세요!</p>
          <button className="cta-button" onClick={scrollToConsultation}>
            지금 바로 무료 견적 받기
          </button>
          <div className="cta-benefits">
            <span>✅ 100% 무료</span>
            <span>✅ 1분 소요</span>
            <span>✅ 전문가 상담</span>
            <span>✅ 최대 30% 할인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareAuto;
