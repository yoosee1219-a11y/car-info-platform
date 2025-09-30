import React from "react";

function QuickQuote() {
  const insuranceTypes = [
    { icon: "🚗", title: "자동차보험", desc: "다이렉트 비교" },
    { icon: "🏥", title: "실손보험", desc: "의료비 보장" },
    { icon: "👨‍👩‍👧‍👦", title: "가족보험", desc: "온가족 보장" },
    { icon: "🏢", title: "암보험", desc: "든든한 보장" },
    { icon: "🏠", title: "주택화재", desc: "내집 지키기" },
    { icon: "👶", title: "어린이보험(태아보험)", desc: "태아부터 성인까지 보장" },
    { icon: "🐶", title: "펫보험", desc: "반려동물 보장" },
    { icon: "🚘", title: "운전자보험", desc: "운전자 보호" },
  ];

  return (
    <section className="quick-quote" id="quick-quote">
      <h2>어떤 보험을 찾으시나요?</h2>
      <div className="quote-options">
        {insuranceTypes.map((type, index) => (
          <div key={index} className="quote-option">
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
