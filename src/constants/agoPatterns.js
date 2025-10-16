/**
 * AGO (AI Generated Optimization) 패턴 상수
 * AI 감지 및 자연스러운 콘텐츠 최적화를 위한 패턴들
 */

// 부자연스러운 표현 패턴
export const UNNATURAL_PHRASES = [
  /또한,/g,
  /그러나,/g,
  /따라서,/g,
  /결론적으로,/g,
  /요약하자면,/g,
  /^첫째,/gm,
  /^둘째,/gm,
  /^셋째,/gm,
  /에 대해 알아보겠습니다/g,
  /살펴보도록 하겠습니다/g,
  /이해하는 것이 중요합니다/g,
  /~하는 것을 알 수 있습니다/g,
  /~라고 할 수 있습니다/g,
  /~하는 것으로 나타났습니다/g,
  /~시기 바랍니다/g,
  /도움이 되었기를 바랍니다/g,
];

// 자연스러운 표현 패턴
export const NATURAL_PHRASES = [
  /근데/g,
  /그치만/g,
  /솔직히/g,
  /개인적으로/g,
  /제 생각엔/g,
  /느낌이/g,
  /~했어요/g,
  /~더라고요/g,
  /~잖아요/g,
  /~거든요/g,
  /~어요/g,
  /~네요/g,
  /~죠/g,
];

// 긍정적 감정 표현
export const POSITIVE_EMOTIONS = [
  /놀랍/g,
  /인상적/g,
  /매력적/g,
  /멋지/g,
  /훌륭/g,
  /좋았/g,
  /마음에 들/g,
  /만족/g,
  /추천/g,
  /신기하/g,
  /재미있/g,
  /흥미롭/g,
  /감동/g,
  /최고/g,
  /완벽/g,
  /완전/g,
  /대박/g,
];

// 부정적 감정 표현
export const NEGATIVE_EMOTIONS = [
  /아쉽/g,
  /실망/g,
  /불편/g,
  /불만/g,
  /부족/g,
  /애매/g,
  /그저 그렇/g,
  /최악/g,
  /별로/g,
  /아쉬웠/g,
];

// 강한 감정 표현
export const STRONG_EMOTIONS = [
  /진짜/g,
  /정말/g,
  /완전/g,
  /대박/g,
  /충격/g,
  /감동/g,
  /최고/g,
  /최악/g,
  /완전히/g,
  /정말로/g,
  /진심으로/g,
];

// 개인 경험 신호
export const EXPERIENCE_SIGNALS = [
  /제가/g,
  /저는/g,
  /제 경험/g,
  /직접/g,
  /~했을 때/g,
  /~하면서/g,
  /~해보니/g,
  /처음엔/g,
  /나중에/g,
  /그때/g,
  /실제로/g,
  /정말로/g,
  /진짜로/g,
];

// AI 특징 패턴 (위험도와 함께)
export const AI_SIGNATURES = [
  { pattern: /^이 글에서는/m, risk: 20, name: "교과서적 시작" },
  { pattern: /^오늘은 .+ 대해 알아보겠습니다/m, risk: 25, name: "전형적 도입" },
  { pattern: /^첫째, .+둘째, .+셋째,/s, risk: 30, name: "기계적 나열" },
  { pattern: /결론적으로 말하자면/g, risk: 15, name: "AI 결론부" },
  { pattern: /~라고 할 수 있습니다/g, risk: 10, name: "중립적 서술" },
  { pattern: /~하는 것으로 나타났습니다/g, risk: 10, name: "객관적 서술" },
  { pattern: /<h2>.*<h2>.*<h2>/s, risk: 15, name: "규칙적 헤딩" },
  { pattern: /~시기 바랍니다/g, risk: 15, name: "과도한 정중함" },
  { pattern: /도움이 되었기를 바랍니다/g, risk: 20, name: "AI 마무리" },
  { pattern: /요약하자면/g, risk: 15, name: "AI 요약 패턴" },
  { pattern: /이해하는 것이 중요합니다/g, risk: 12, name: "교과서적 설명" },
];

// 치명적 반복 문구
export const CRITICAL_REPEATS = [
  /~을\(를\) 제공합니다/g,
  /~의 특징입니다/g,
  /~할 수 있습니다/g,
  /우수한 성능을 자랑합니다/g,
  /뛰어난 .+을\(를\) 보여줍니다/g,
  /~에 적합합니다/g,
  /~을\(를\) 지원합니다/g,
];

// 전문 용어 패턴
export const TECHNICAL_TERMS = [
  /토크/g,
  /마력/g,
  /cc/g,
  /rpm/g,
  /서스펜션/g,
  /변속기/g,
  /엔진/g,
  /제동력/g,
  /핸들링/g,
  /연비/g,
  /배기량/g,
  /최대출력/g,
  /최대토크/g,
  /구동방식/g,
  /변속기/g,
  /서스펜션/g,
];

// 구체적 수치 패턴
export const SPECIFIC_NUMBERS =
  /\d+(\.\d+)?(km\/L|cc|마력|만원|초|kg|mm|리터|km|km\/h)/g;

// 가중치 설정
export const AGO_WEIGHTS = {
  naturalWriting: 0.2,
  repetitionPattern: 0.15,
  emotionalExpression: 0.2,
  sentenceDiversity: 0.1,
  originalPerspective: 0.2,
  expertiseSignals: 0.1,
  aiPatternDetection: 0.05,
};

// 위험도 임계값
export const RISK_THRESHOLDS = {
  LOW: 40,
  MEDIUM: 70,
  HIGH: 90,
};

// 점수 임계값
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70,
  FAIR: 50,
  POOR: 30,
};
