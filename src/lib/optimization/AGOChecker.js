/**
 * AGO 체커 메인 클래스
 * AI 생성 콘텐츠 감지 및 자연스러운 콘텐츠 최적화
 */

import {
  UNNATURAL_PHRASES,
  NATURAL_PHRASES,
  POSITIVE_EMOTIONS,
  NEGATIVE_EMOTIONS,
  STRONG_EMOTIONS,
  EXPERIENCE_SIGNALS,
  AI_SIGNATURES,
  CRITICAL_REPEATS,
  TECHNICAL_TERMS,
  SPECIFIC_NUMBERS,
  AGO_WEIGHTS,
  RISK_THRESHOLDS,
  SCORE_THRESHOLDS,
} from "../../constants/agoPatterns";

export class AGOChecker {
  /**
   * 콘텐츠 전체 평가
   * @param {string} content - 분석할 콘텐츠
   * @param {string} title - 제목 (선택사항)
   * @param {Object} metadata - 메타데이터 (선택사항)
   * @returns {Object} 평가 결과
   */
  evaluate(content, title = "", metadata = {}) {
    try {
      const agoFactors = {
        naturalWriting: this.checkNaturalWriting(content),
        repetitionPattern: this.checkRepetitionPattern(content),
        emotionalExpression: this.checkEmotionalExpression(content),
        sentenceDiversity: this.checkSentenceDiversity(content),
        originalPerspective: this.checkOriginalPerspective(content),
        expertiseSignals: this.checkExpertiseSignals(content),
        aiPatternDetection: this.detectAIPatterns(content),
        structuralMonotony: this.checkStructuralMonotony(content),
      };

      const score = this.calculateAGOScore(agoFactors);
      const aiDetectionRisk = this.calculateAIDetectionRisk(agoFactors);
      const recommendations = this.generateAGORecommendations(agoFactors);

      return {
        score,
        factors: agoFactors,
        recommendations,
        aiDetectionRisk,
        timestamp: new Date().toISOString(),
        contentLength: content.length,
      };
    } catch (error) {
      console.error("AGO 체크 실패:", error);
      return this.getDefaultResult();
    }
  }

  /**
   * 자연스러운 문체 검사
   */
  checkNaturalWriting(content) {
    let score = 100;
    let unnaturalCount = 0;
    let naturalCount = 0;

    // 부자연스러운 표현 체크
    UNNATURAL_PHRASES.forEach((pattern) => {
      const matches = (content.match(pattern) || []).length;
      unnaturalCount += matches;
      score -= matches * 5;
    });

    // 자연스러운 표현 체크
    NATURAL_PHRASES.forEach((pattern) => {
      const matches = (content.match(pattern) || []).length;
      naturalCount += matches;
    });

    if (naturalCount > 0) {
      score += Math.min(naturalCount * 3, 20);
    }

    return {
      passed: score >= SCORE_THRESHOLDS.GOOD,
      score: Math.max(0, Math.min(100, score)),
      unnaturalCount,
      naturalCount,
      suggestion:
        unnaturalCount > 5
          ? '구어체로 변경 (예: "또한" → "그리고", "살펴보겠습니다" → "볼게요")'
          : "좋음",
    };
  }

  /**
   * 반복 패턴 감지
   */
  checkRepetitionPattern(content) {
    let score = 100;
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 10);

    // 문장 시작 패턴 분석
    const startPatterns = {};
    sentences.forEach((s) => {
      const start = s.trim().substring(0, 3);
      startPatterns[start] = (startPatterns[start] || 0) + 1;
    });

    const repetitiveStarts = Object.values(startPatterns).filter(
      (count) => count >= 3
    ).length;

    if (repetitiveStarts > 0) score -= repetitiveStarts * 15;

    // 치명적 반복 문구
    let criticalCount = 0;
    CRITICAL_REPEATS.forEach((pattern) => {
      const matches = (content.match(pattern) || []).length;
      if (matches >= 3) {
        criticalCount++;
        score -= 20;
      }
    });

    return {
      passed: score >= SCORE_THRESHOLDS.GOOD,
      score: Math.max(0, score),
      repetitiveStarts,
      criticalRepeats: criticalCount,
      suggestion:
        criticalCount > 0 ? "같은 표현을 다양한 방식으로 변경" : "좋음",
    };
  }

  /**
   * 감정 표현 분석
   */
  checkEmotionalExpression(content) {
    let score = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let strongCount = 0;

    POSITIVE_EMOTIONS.forEach((pattern) => {
      positiveCount += (content.match(pattern) || []).length;
    });

    NEGATIVE_EMOTIONS.forEach((pattern) => {
      negativeCount += (content.match(pattern) || []).length;
    });

    STRONG_EMOTIONS.forEach((pattern) => {
      strongCount += (content.match(pattern) || []).length;
    });

    score += Math.min(positiveCount * 10, 40);
    score += Math.min(negativeCount * 15, 30);
    score += Math.min(strongCount * 10, 30);

    const hasBalance = positiveCount > 0 && negativeCount > 0;
    if (hasBalance) score += 20;

    return {
      passed: score >= SCORE_THRESHOLDS.FAIR,
      score: Math.min(100, score),
      positive: positiveCount,
      negative: negativeCount,
      strong: strongCount,
      balanced: hasBalance,
      suggestion:
        negativeCount === 0
          ? "⚠️ 단점/아쉬운 점 추가 필수! (긍정만 있으면 AI 냄새)"
          : score < SCORE_THRESHOLDS.FAIR
          ? "더 많은 감정 표현 추가"
          : "좋음",
    };
  }

  /**
   * 문장 다양성 검사
   */
  checkSentenceDiversity(content) {
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 5);
    const lengths = sentences.map((s) => s.length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance =
      lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) /
      lengths.length;
    const stdDev = Math.sqrt(variance);

    const diversityScore = Math.min(100, (stdDev / avgLength) * 200);

    return {
      passed: diversityScore >= SCORE_THRESHOLDS.FAIR,
      score: diversityScore,
      avgLength: avgLength.toFixed(1),
      stdDev: stdDev.toFixed(1),
      suggestion:
        diversityScore < SCORE_THRESHOLDS.FAIR
          ? "문장 길이를 다양하게 (짧은 문장, 긴 문장 섞기)"
          : "좋음",
    };
  }

  /**
   * 독창적 관점 검사
   */
  checkOriginalPerspective(content) {
    let score = 0;
    let experienceCount = 0;

    EXPERIENCE_SIGNALS.forEach((pattern) => {
      experienceCount += (content.match(pattern) || []).length;
    });

    score += Math.min(experienceCount * 8, 40);

    return {
      passed: score >= SCORE_THRESHOLDS.FAIR,
      score: Math.min(100, score),
      experience: experienceCount,
      suggestion:
        experienceCount === 0
          ? '⭐ 개인적 경험 추가 필수! (예: "제가 직접 타봤을 때...")'
          : "좋음",
    };
  }

  /**
   * 전문성 신호 검사
   */
  checkExpertiseSignals(content) {
    let score = 0;

    const technicalTerms = (
      content.match(new RegExp(TECHNICAL_TERMS.join("|"), "g")) || []
    ).length;
    score += Math.min(technicalTerms * 5, 30);

    const specificNumbers = (content.match(SPECIFIC_NUMBERS) || []).length;
    score += Math.min(specificNumbers * 8, 40);

    return {
      passed: score >= SCORE_THRESHOLDS.FAIR,
      score: Math.min(100, score),
      technicalTerms,
      specificNumbers,
      suggestion:
        specificNumbers < 3
          ? "구체적 수치 추가 (예: 13.5km/L, 190마력)"
          : "좋음",
    };
  }

  /**
   * AI 패턴 감지 (핵심!)
   */
  detectAIPatterns(content) {
    let aiRiskScore = 0;
    const detectedPatterns = [];

    AI_SIGNATURES.forEach(({ pattern, risk, name }) => {
      if (pattern.test(content)) {
        aiRiskScore += risk;
        detectedPatterns.push(name);
      }
    });

    return {
      passed: aiRiskScore < RISK_THRESHOLDS.LOW,
      aiRiskScore,
      detectedPatterns,
      isHighRisk: aiRiskScore >= RISK_THRESHOLDS.MEDIUM,
      suggestion:
        aiRiskScore >= RISK_THRESHOLDS.LOW
          ? `⚠️ AI 생성 의심! (${detectedPatterns.join(
              ", "
            )}) - 자연스럽게 재작성 필요`
          : "좋음",
    };
  }

  /**
   * 구조적 단조로움 검사
   */
  checkStructuralMonotony(content) {
    const paragraphs = content
      .split("\n\n")
      .filter((p) => p.trim().length > 20);
    const sentenceCounts = paragraphs.map(
      (p) => p.split(/[.!?]+/).filter((s) => s.trim().length > 5).length
    );

    const avgSentences =
      sentenceCounts.reduce((a, b) => a + b, 0) / sentenceCounts.length;
    const variance =
      sentenceCounts.reduce(
        (sum, count) => sum + Math.pow(count - avgSentences, 2),
        0
      ) / sentenceCounts.length;

    const isDiverse = variance > 2;
    const monotonyScore = isDiverse
      ? 100
      : Math.max(0, 100 - (3 - variance) * 30);

    return {
      passed: monotonyScore >= SCORE_THRESHOLDS.FAIR,
      score: monotonyScore,
      avgSentencesPerParagraph: avgSentences.toFixed(1),
      variance: variance.toFixed(2),
      isDiverse,
      suggestion: !isDiverse ? "문단 길이를 다양하게" : "좋음",
    };
  }

  /**
   * AGO 점수 계산
   */
  calculateAGOScore(factors) {
    let totalScore = 0;

    totalScore += factors.naturalWriting.score * AGO_WEIGHTS.naturalWriting;
    totalScore +=
      factors.repetitionPattern.score * AGO_WEIGHTS.repetitionPattern;
    totalScore +=
      factors.emotionalExpression.score * AGO_WEIGHTS.emotionalExpression;
    totalScore +=
      factors.sentenceDiversity.score * AGO_WEIGHTS.sentenceDiversity;
    totalScore +=
      factors.originalPerspective.score * AGO_WEIGHTS.originalPerspective;
    totalScore += factors.expertiseSignals.score * AGO_WEIGHTS.expertiseSignals;
    totalScore +=
      (100 - factors.aiPatternDetection.aiRiskScore) *
      AGO_WEIGHTS.aiPatternDetection;

    return Math.round(totalScore);
  }

  /**
   * AI 감지 위험도 계산
   */
  calculateAIDetectionRisk(factors) {
    let riskScore = 0;

    if (factors.naturalWriting.score < SCORE_THRESHOLDS.GOOD) riskScore += 20;
    if (factors.repetitionPattern.score < SCORE_THRESHOLDS.GOOD)
      riskScore += 20;
    if (factors.emotionalExpression.score < SCORE_THRESHOLDS.FAIR)
      riskScore += 25;
    if (factors.originalPerspective.score < SCORE_THRESHOLDS.FAIR)
      riskScore += 25;
    riskScore += factors.aiPatternDetection.aiRiskScore * 0.1;

    const level =
      riskScore >= RISK_THRESHOLDS.MEDIUM
        ? "HIGH"
        : riskScore >= RISK_THRESHOLDS.LOW
        ? "MEDIUM"
        : "LOW";
    const message = this.getRiskMessage(riskScore);

    return {
      score: Math.round(riskScore),
      level,
      message,
    };
  }

  /**
   * 위험도 메시지 생성
   */
  getRiskMessage(riskScore) {
    if (riskScore >= RISK_THRESHOLDS.MEDIUM) {
      return "🚨 높음 - AI 생성 의심! 사람이 직접 다시 작성 권장";
    } else if (riskScore >= RISK_THRESHOLDS.LOW) {
      return "⚠️ 중간 - 일부 수정 필요 (감정 표현, 개인 경험 추가)";
    } else {
      return "✅ 낮음 - 자연스러운 콘텐츠";
    }
  }

  /**
   * 개선 제안 생성
   */
  generateAGORecommendations(factors) {
    const recommendations = [];

    if (factors.naturalWriting.score < SCORE_THRESHOLDS.GOOD) {
      recommendations.push({
        priority: "HIGH",
        category: "문체 개선",
        issue: "부자연스러운 표현이 많음",
        action:
          '구어체로 변경 (예: "또한" → "그리고", "~하겠습니다" → "~할게요")',
      });
    }

    if (factors.emotionalExpression.score < SCORE_THRESHOLDS.FAIR) {
      recommendations.push({
        priority: "CRITICAL",
        category: "감정 표현",
        issue: "감정 표현이 부족함",
        action: '긍정/부정 감정 추가 (예: "정말 놀라웠어요", "아쉬웠던 점은")',
      });
    }

    if (factors.originalPerspective.score < SCORE_THRESHOLDS.FAIR) {
      recommendations.push({
        priority: "CRITICAL",
        category: "개인 경험",
        issue: "개인적 관점이 없음",
        action:
          '직접 경험 추가 (예: "제가 직접 타봤을 때...", "처음엔 ~했는데")',
      });
    }

    if (factors.aiPatternDetection.isHighRisk) {
      recommendations.push({
        priority: "CRITICAL",
        category: "AI 패턴 감지",
        issue: "AI 생성 패턴이 감지됨",
        action: `다음 패턴 제거: ${factors.aiPatternDetection.detectedPatterns.join(
          ", "
        )}`,
      });
    }

    return recommendations;
  }

  /**
   * 기본 결과 반환 (에러 시)
   */
  getDefaultResult() {
    return {
      score: 0,
      factors: {},
      recommendations: [
        {
          priority: "HIGH",
          category: "시스템 오류",
          issue: "분석 중 오류 발생",
          action: "콘텐츠를 다시 확인해주세요",
        },
      ],
      aiDetectionRisk: {
        score: 100,
        level: "HIGH",
        message: "분석 실패",
      },
      timestamp: new Date().toISOString(),
      contentLength: 0,
    };
  }
}
