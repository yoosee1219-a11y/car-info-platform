import React, { useState } from "react";
import toast from "react-hot-toast";

function ComparisonSection() {
  const [filters, setFilters] = useState({
    carType: "중형차",
    driverAge: "만 31-40세",
    experience: "3-5년",
    coverage: "자차 포함",
  });

  const mockResults = [
    {
      company: "현대",
      name: "현대 그랜저",
      note: "신차 출고 프로모션 진행 중",
      price: 650000,
    },
    {
      company: "기아",
      name: "기아 K8",
      note: "무이자 할부 가능",
      price: 620000,
    },
    {
      company: "제네시스",
      name: "제네시스 G80",
      note: "프리미엄 옵션 포함",
      price: 890000,
    },
  ];

  const handleCompare = () => {
    toast.success(
      "실제 서비스에서는 렌터카/리스 업체 API와 연동하여 실시간 견적을 제공합니다."
    );
  };

  return (
    <section className="comparison-section" id="compare">
      <h2 className="section-title">🔍 실시간 차량 비교</h2>
      <div className="comparison-tool">
        <h3>인기 차량 비교</h3>

        <div className="comparison-filters">
          <div className="filter-group">
            <label>차량 종류</label>
            <select
              value={filters.carType}
              onChange={(e) =>
                setFilters({ ...filters, carType: e.target.value })
              }
            >
              <option>소형차</option>
              <option>중형차</option>
              <option>대형차</option>
              <option>SUV</option>
            </select>
          </div>

          <div className="filter-group">
            <label>예산 범위</label>
            <select
              value={filters.driverAge}
              onChange={(e) =>
                setFilters({ ...filters, driverAge: e.target.value })
              }
            >
              <option>3천만원 이하</option>
              <option>3천-5천만원</option>
              <option>5천-7천만원</option>
              <option>7천만원 이상</option>
            </select>
          </div>

          <div className="filter-group">
            <label>연료 타입</label>
            <select
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
            >
              <option>가솔린</option>
              <option>디젤</option>
              <option>하이브리드</option>
              <option>전기</option>
            </select>
          </div>

          <div className="filter-group">
            <label>서비스 종류</label>
            <select
              value={filters.coverage}
              onChange={(e) =>
                setFilters({ ...filters, coverage: e.target.value })
              }
            >
              <option>렌터카</option>
              <option>리스</option>
              <option>모두</option>
            </select>
          </div>
        </div>

        <button
          className="cta-button"
          onClick={handleCompare}
          style={{ width: "100%" }}
        >
          비교 견적 받기
        </button>

        <div className="comparison-results">
          <h4>비교 결과 (월 납입금)</h4>
          {mockResults.map((result, index) => (
            <div key={index} className="result-card">
              <div className="insurance-company">
                <div className="company-logo">{result.company}</div>
                <div>
                  <h4>{result.name}</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {result.note}
                  </p>
                </div>
              </div>
              <div className="price-info">
                <div className="price">{result.price.toLocaleString()}원</div>
                <div className="price-label">월 납입</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;
