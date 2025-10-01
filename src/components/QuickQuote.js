import React from "react";
import { useNavigate } from "react-router-dom";

function QuickQuote() {
  const navigate = useNavigate();

  const insuranceTypes = [
    {
      icon: "🚗",
      title: "자동차보험",
      desc: "다이렉트 비교",
      link: "/compare/auto",
    },
    {
      icon: "🏥",
      title: "실손보험",
      desc: "의료비 보장",
      link: "/compare/health",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "가족보험",
      desc: "온가족 보장",
      link: "/compare/family",
    },
    {
      icon: "🏢",
      title: "암보험",
      desc: "든든한 보장",
      link: "/compare/cancer",
    },
    {
      icon: "🏠",
      title: "주택화재",
      desc: "내집 지키기",
      link: "/compare/fire",
    },
    {
      icon: "👶",
      title: "어린이(태아)보험",
      desc: "태아부터 평생보장",
      link: "/compare/child",
    },
    {
      icon: "🐶",
      title: "펫보험",
      desc: "반려동물 보장",
      link: "/compare/pet",
    },
    {
      icon: "🚘",
      title: "운전자보험",
      desc: "운전자 보호",
      link: "/compare/driver",
    },
  ];

  const handleClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <section className="quick-quote" id="quick-quote">
      <h2>어떤 보험을 찾으시나요?</h2>
      <div className="quote-options">
        {insuranceTypes.map((type, index) => (
          <div
            key={index}
            className={`quote-option ${type.link ? "clickable" : ""}`}
            onClick={() => handleClick(type.link)}
            style={{ cursor: type.link ? "pointer" : "default" }}
          >
            <i>{type.icon}</i>
            <h4>{type.title}</h4>
            <p>{type.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickQuote;
