import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <a href="/" className="logo">
          🏦 인슈어팟
        </a>
        <ul className="nav-menu">
          <li><a href="#info">보험정보</a></li>
          <li><a href="#compare">보험비교</a></li>
          <li><a href="#consult">상담신청</a></li>
          <li><a href="/admin">관리자</a></li>
        </ul>
        <a href="#quick-quote" className="cta-button">무료 견적받기</a>
      </nav>
    </header>
  );
}

export default Header;
