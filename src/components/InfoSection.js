import React from "react";
import { Link } from "react-router-dom";
import { stripHtmlTags } from "../utils";

function InfoSection({ posts, loading }) {
  // 샘플 데이터 (Supabase에 데이터가 없을 때)
  const samplePosts = [
    {
      id: 1,
      title: "장기 렌터카 vs 리스 비교",
      category: "차량 정보",
      summary: "당신에게 맞는 선택은? 장단점 비교 분석",
      view_count: 1523,
    },
    {
      id: 2,
      title: "2025년 인기 SUV 추천",
      category: "차량 비교",
      summary: "가족용 SUV 베스트 5와 선택 가이드",
      view_count: 892,
    },
    {
      id: 3,
      title: "전기차 장기 렌터카 가이드",
      category: "렌터카 가이드",
      summary: "전기차로 유류비 70% 절감하는 방법",
      view_count: 2104,
    },
    {
      id: 4,
      title: "장기 렌터카 월 납입금 줄이기",
      category: "절약 팁",
      summary: "계약 조건 협상과 프로모션 활용법",
      view_count: 756,
    },
    {
      id: 5,
      title: "신차 vs 중고차 장기 렌터카",
      category: "차량 비교",
      summary: "예산별 최적의 선택 가이드",
      view_count: 1340,
    },
    {
      id: 6,
      title: "리스 계약 전 체크리스트",
      category: "리스 가이드",
      summary: "숨겨진 비용과 중도 해지 조건 확인",
      view_count: 2890,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  if (loading) {
    return (
      <section className="info-section" id="info">
        <div className="loading">게시글을 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="info-section" id="info">
      <div className="info-section-header">
        <h2 className="section-title">📚 차량 완벽 가이드</h2>
        <Link to="/posts" className="btn-view-all">
          전체 보기 →
        </Link>
      </div>
      <div className="info-grid">
        {displayPosts.map((post) => {
          // HTML 태그 제거하고 순수 텍스트만 추출
          const excerpt = post.summary || stripHtmlTags(post.content, 100);

          return (
            <Link to={`/post/${post.id}`} key={post.id} className="info-card">
              <h3>{post.title}</h3>
              <p>{excerpt}</p>
              <div className="meta">
                {post.category} | 조회 {post.view_count || 0}회
              </div>
            </Link>
          );
        })}
      </div>
      <div className="info-section-footer">
        <Link to="/posts" className="btn-view-all-large">
          더 많은 차량 정보 보기 →
        </Link>
      </div>
    </section>
  );
}

export default InfoSection;
