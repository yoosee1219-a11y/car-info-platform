import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>회사 소개</h4>
          <ul>
            <li>
              <a href="#about">카인포 소개</a>
            </li>
            <li>
              <a href="#partnership">제휴 문의</a>
            </li>
            <li>
              <a href="#careers">채용 정보</a>
            </li>
            <li>
              <a href="#press">보도자료</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>서비스</h4>
          <ul>
            <li>
              <a href="#rental">장기 렌터카</a>
            </li>
            <li>
              <a href="#lease">리스</a>
            </li>
            <li>
              <a href="#compare">차량 비교</a>
            </li>
            <li>
              <a href="#calculator">견적 계산기</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>고객 지원</h4>
          <ul>
            <li>
              <a href="#faq">자주 묻는 질문</a>
            </li>
            <li>
              <a href="#contact">1:1 문의</a>
            </li>
            <li>
              <a href="#guide">이용 가이드</a>
            </li>
            <li>
              <a href="#terms">차량 용어사전</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>법적 고지</h4>
          <ul>
            <li>
              <a href="#terms">이용약관</a>
            </li>
            <li>
              <a href="#privacy">개인정보처리방침</a>
            </li>
            <li>
              <a href="#car-law">자동차관리법 안내</a>
            </li>
            <li>
              <a href="#consumer">소비자보호</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 카인포. All rights reserved. | 사업자등록번호:
          123-45-67890
        </p>
      </div>
    </footer>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(Footer);
