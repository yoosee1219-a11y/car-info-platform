import React, { useState } from 'react';

function ConsultationSection({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insurance_type: '자동차보험',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('이름과 전화번호는 필수입니다.');
      return;
    }
    
    const success = await onSubmit(formData);
    
    if (success) {
      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        email: '',
        insurance_type: '자동차보험',
        message: ''
      });
    }
  };

  return (
    <section className="consultation-section" id="consult">
      <div className="consultation-content">
        <h2 className="section-title" style={{ color: 'white' }}>
          🤝 전문가 상담 서비스
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
          복잡한 보험, 전문가와 함께 해결하세요
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
            <label>보험 종류</label>
            <select
              name="insurance_type"
              value={formData.insurance_type}
              onChange={handleChange}
            >
              <option>자동차보험</option>
              <option>실손보험</option>
              <option>암보험</option>
              <option>가족보험</option>
              <option>주택화재보험</option>
              <option>여행자보험</option>
              <option>기타</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>문의 내용</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="상담받고 싶은 내용을 자유롭게 작성해주세요"
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
