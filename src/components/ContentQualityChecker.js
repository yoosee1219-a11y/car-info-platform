/**
 * 콘텐츠 품질 체커 메인 컴포넌트
 * 워드프레스 스타일 사이드바 형태
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AGOChecker } from "../lib/optimization";
import "./ContentQualityChecker.css";

const ContentQualityChecker = ({ content, title, onScreenshot }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const checkerRef = useRef(null);

  const agoChecker = useRef(new AGOChecker());

  const analyzeContent = useCallback(async () => {
    if (!content || content.trim().length < 50) {
      setError("분석할 콘텐츠가 충분하지 않습니다. (최소 50자)");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await agoChecker.current.evaluate(content, title);
      setAnalysisResult(result);
      setIsVisible(true);
    } catch (err) {
      console.error("분석 실패:", err);
      setError("분석 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [content, title]);

  // 콘텐츠가 변경될 때마다 자동 분석
  useEffect(() => {
    if (content && content.trim().length > 50) {
      analyzeContent();
    }
  }, [content, analyzeContent]);

  const handleScreenshot = async () => {
    if (!checkerRef.current || !analysisResult) return;

    try {
      // HTML2Canvas 라이브러리 사용 (필요시 설치)
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(checkerRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });

      // 파일명 생성 (제목 기반)
      const sanitizedTitle = title
        ? title.replace(/[^a-zA-Z0-9가-힣\s]/g, "").replace(/\s+/g, "_")
        : "content_analysis";

      const fileName = `${sanitizedTitle}_${
        new Date().toISOString().split("T")[0]
      }.png`;

      // 다운로드
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();

      // 콜백 호출
      if (onScreenshot) {
        onScreenshot(fileName, canvas.toDataURL());
      }
    } catch (err) {
      console.error("스크린샷 생성 실패:", err);
      alert("스크린샷 생성에 실패했습니다.");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "#10b981"; // green
    if (score >= 70) return "#f59e0b"; // yellow
    if (score >= 50) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "LOW":
        return "#10b981";
      case "MEDIUM":
        return "#f59e0b";
      case "HIGH":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  if (!isVisible && !isAnalyzing) {
    return (
      <div className="content-quality-checker-toggle">
        <button
          onClick={() => setIsVisible(true)}
          className="quality-checker-btn"
          title="콘텐츠 품질 분석"
        >
          📊 품질 분석
        </button>
      </div>
    );
  }

  return (
    <div className="content-quality-checker-sidebar">
      <div className="sidebar-header">
        <h3>📊 콘텐츠 품질 분석</h3>
        <button
          className="close-btn"
          onClick={() => setIsVisible(false)}
          title="닫기"
        >
          ×
        </button>
      </div>

      <div className="sidebar-content" ref={checkerRef}>
        {isAnalyzing && (
          <div className="analyzing-state">
            <div className="spinner"></div>
            <p>분석 중...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>❌ {error}</p>
            <button onClick={analyzeContent} className="retry-btn">
              다시 시도
            </button>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <>
            {/* 전체 점수 */}
            <div className="overall-score">
              <div className="score-circle">
                <div
                  className="score-fill"
                  style={{
                    background: `conic-gradient(${getScoreColor(
                      analysisResult.score
                    )} ${analysisResult.score * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                >
                  <div className="score-text">{analysisResult.score}</div>
                </div>
              </div>
              <p className="score-label">AGO 점수</p>
            </div>

            {/* AI 감지 위험도 */}
            <div className="ai-risk-section">
              <h4>🤖 AI 감지 위험도</h4>
              <div
                className="risk-indicator"
                style={{
                  backgroundColor: getRiskColor(
                    analysisResult.aiDetectionRisk.level
                  ),
                }}
              >
                <span className="risk-level">
                  {analysisResult.aiDetectionRisk.level}
                </span>
                <span className="risk-score">
                  {analysisResult.aiDetectionRisk.score}%
                </span>
              </div>
              <p className="risk-message">
                {analysisResult.aiDetectionRisk.message}
              </p>
            </div>

            {/* 상세 분석 결과 */}
            <div className="detailed-analysis">
              <h4>📋 상세 분석</h4>
              {Object.entries(analysisResult.factors).map(([key, factor]) => (
                <div key={key} className="factor-item">
                  <div className="factor-header">
                    <span className="factor-name">{getFactorName(key)}</span>
                    <span
                      className="factor-score"
                      style={{ color: getScoreColor(factor.score) }}
                    >
                      {factor.score}
                    </span>
                  </div>
                  <div className="factor-bar">
                    <div
                      className="factor-fill"
                      style={{
                        width: `${factor.score}%`,
                        backgroundColor: getScoreColor(factor.score),
                      }}
                    />
                  </div>
                  <p className="factor-suggestion">{factor.suggestion}</p>
                </div>
              ))}
            </div>

            {/* 개선 제안 */}
            {analysisResult.recommendations.length > 0 && (
              <div className="recommendations">
                <h4>💡 개선 제안</h4>
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="rec-priority">
                      <span
                        className={`priority-badge priority-${rec.priority.toLowerCase()}`}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <div className="rec-content">
                      <strong>{rec.category}</strong>
                      <p>{rec.issue}</p>
                      <p className="rec-action">{rec.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="action-buttons">
              <button
                onClick={analyzeContent}
                className="action-btn refresh-btn"
                disabled={isAnalyzing}
              >
                🔄 다시 분석
              </button>
              <button
                onClick={handleScreenshot}
                className="action-btn screenshot-btn"
              >
                📸 스크린샷 저장
              </button>
            </div>

            {/* 메타 정보 */}
            <div className="meta-info">
              <p>
                분석 시간: {new Date(analysisResult.timestamp).toLocaleString()}
              </p>
              <p>콘텐츠 길이: {analysisResult.contentLength}자</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// 팩터 이름 매핑
const getFactorName = (key) => {
  const names = {
    naturalWriting: "자연스러운 문체",
    repetitionPattern: "반복 패턴",
    emotionalExpression: "감정 표현",
    sentenceDiversity: "문장 다양성",
    originalPerspective: "독창적 관점",
    expertiseSignals: "전문성 신호",
    aiPatternDetection: "AI 패턴 감지",
    structuralMonotony: "구조적 다양성",
  };
  return names[key] || key;
};

export default ContentQualityChecker;
