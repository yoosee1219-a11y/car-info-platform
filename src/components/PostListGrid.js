/**
 * 게시글 그리드 컴포넌트
 * 게시글 목록을 그리드 형태로 렌더링
 */

import React from "react";
import PostCard from "./PostCard";

/**
 * 게시글 그리드 컴포넌트
 * @param {Array} posts - 표시할 게시글 배열
 * @param {boolean} loading - 로딩 상태
 */
function PostListGrid({ posts, loading }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <div className="no-posts-icon">📝</div>
        <h3>게시글이 없습니다</h3>
        <p>검색 조건을 변경해보세요.</p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default React.memo(PostListGrid);
