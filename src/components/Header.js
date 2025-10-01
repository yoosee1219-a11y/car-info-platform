import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // 메인 페이지가 아니면 먼저 메인 페이지로 이동
    if (location.pathname !== '/') {
      navigate('/');
      // 페이지 이동 후 스크롤
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // 이미 메인 페이지면 바로 스크롤
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          🏦 인슈어팟
        </Link>
        <ul className="nav-menu">
          <li><a href="#info" onClick={(e) => { e.preventDefault(); scrollToSection('#info'); }}>보험정보</a></li>
          <li><a href="#compare" onClick={(e) => { e.preventDefault(); scrollToSection('#compare'); }}>보험비교</a></li>
          <li><a href="#consult" onClick={(e) => { e.preventDefault(); scrollToSection('#consult'); }}>상담신청</a></li>
          <li><Link to="/admin">관리자</Link></li>
        </ul>
        <a href="#quick-quote" onClick={(e) => { e.preventDefault(); scrollToSection('#quick-quote'); }} className="cta-button">무료 견적받기</a>
      </nav>
    </header>
  );
}

export default Header;
