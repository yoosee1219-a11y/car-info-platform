/**
 * 차량 FAQ 컴포넌트
 * 자주 묻는 질문과 답변
 */

import React from "react";

/**
 * 차량 FAQ 컴포넌트
 * @param {Array} faqs - FAQ 배열
 */
function CarDetailFAQ({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faq-section">
      <h2>자주 묻는 질문</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question">
              <h3>Q. {faq.question}</h3>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CarDetailFAQ);
