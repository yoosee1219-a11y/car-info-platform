import React from "react";

function Hero() {
  return (
    <section className="hero">
      <h1>똑똑한 차량 선택, 카인포와 함께</h1>
      <p>차량 정보부터 장기 렌터카/리스 상담까지, 모든 차량 정보를 한 곳에서</p>
    </section>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(Hero);
