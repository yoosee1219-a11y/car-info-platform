import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  CONSULTATION_FORM_DEFAULTS,
  CAR_BRAND_LIST,
  SERVICE_TYPE_LIST,
  AVAILABLE_TIME_LIST,
  REGION_LIST,
  CONSULTATION_MESSAGES,
} from "../constants";

function ConsultationSection({ onSubmit }) {
  const [formData, setFormData] = useState(CONSULTATION_FORM_DEFAULTS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.available_time ||
      !formData.region
    ) {
      toast.error(CONSULTATION_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    const success = await onSubmit(formData);

    if (success) {
      // 폼 초기화
      setFormData(CONSULTATION_FORM_DEFAULTS);
    }
  };

  return (
    <section className="consultation-section" id="consult">
      <div className="consultation-content">
        <h2 className="section-title" style={{ color: "white" }}>
          🚗 장기 렌터카/리스 상담
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          최적의 차량과 조건을 찾아드립니다
        </p>

        <form onSubmit={handleSubmit} className="consultation-form">
          <div className="form-group">
            <label>이름 *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label>연락처 *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              required
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label>희망 차량 브랜드</label>
            <select
              name="car_brand"
              value={formData.car_brand}
              onChange={handleChange}
            >
              {CAR_BRAND_LIST.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>희망 차량 모델 (선택사항)</label>
            <input
              type="text"
              name="car_model"
              value={formData.car_model}
              onChange={handleChange}
              placeholder="예: 그랜저, 쏘나타, K5 등"
            />
          </div>

          <div className="form-group">
            <label>서비스 종류</label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
            >
              {SERVICE_TYPE_LIST.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>통화 가능 시간 *</label>
            <select
              name="available_time"
              value={formData.available_time}
              onChange={handleChange}
              required
            >
              {AVAILABLE_TIME_LIST.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>지역 *</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              {REGION_LIST.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>문의 내용</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="차량이나 계약 조건에 대해 궁금하신 점을 자유롭게 작성해주세요"
            />
          </div>

          <button type="submit" className="submit-button">
            상담 신청하기
          </button>
        </form>
      </div>
    </section>
  );
}

export default ConsultationSection;
