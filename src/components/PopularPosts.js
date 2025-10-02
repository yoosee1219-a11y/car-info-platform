/**
 * 인기 게시글 섹션 컴포넌트
 * 관리자가 설정한 인기글(is_featured) 또는 조회수 상위 게시글 표시
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postService } from "../services";
import "./PopularPosts.css";

function PopularPosts() {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      setLoading(true);
      
      try {
        const result = await postService.fetchPopular(5);
        
        if (result.success) {
          setPopularPosts(result.data);
        } else {
          console.error("인기 게시글 로딩 실패:", result.error);
        }
      } catch (error) {
        console.error("인기 게시글 로딩 오류:", error);
      }
      
      setLoading(false);
    };

    fetchPopularPosts();
  }, []);

  if (loading) {
    return (
      <section className="popular-posts-section">
        <div className="popular-container">
          <h2 className="popular-title">🔥 인기 게시글</h2>
          <div className="popular-loading">로딩 중...</div>
        </div>
      </section>
    );
  }

  if (popularPosts.length === 0) {
    return null; // 인기글이 없으면 섹션 자체를 숨김
  }

  return (
    <section className="popular-posts-section">
      <div className="popular-container">
        <div className="popular-header">
          <h2 className="popular-title">🔥 인기 게시글</h2>
          <p className="popular-subtitle">
            가장 많이 본 보험 정보를 확인해보세요
          </p>
        </div>

        <div className="popular-list">
          {popularPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="popular-item"
            >
              <div className="popular-rank">
                <span className={`rank-number rank-${index + 1}`}>
                  {index + 1}
                </span>
              </div>

              <div className="popular-content">
                <div className="popular-item-header">
                  {post.is_featured && <span className="featured-badge">⭐</span>}
                  <span className="popular-category">{post.category}</span>
                </div>

                <h3 className="popular-item-title">{post.title}</h3>

                <div className="popular-meta">
                  <span className="popular-views">
                    👁️ {(post.view_count || 0).toLocaleString()} 조회
                  </span>
                  <span className="popular-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="popular-arrow">→</div>
            </Link>
          ))}
        </div>

        <div className="popular-footer">
          <Link to="/posts" className="btn-view-all-posts">
            전체 게시글 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularPosts;

