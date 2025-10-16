/**
 * 게시글 페이지네이션 컴포넌트
 * 페이지 네비게이션 UI
 */

import React from "react";

/**
 * 게시글 페이지네이션 컴포넌트
 * @param {Object} pagination - 페이지네이션 정보
 * @param {Function} onPageChange - 페이지 변경 핸들러
 */
function PostListPagination({ pagination, onPageChange }) {
  const { totalPages, currentPage, hasNextPage, hasPrevPage, totalPosts } =
    pagination;

  // 페이지가 1개 이하면 페이지네이션 숨김
  if (totalPages <= 1) {
    return null;
  }

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 앞뒤 2페이지씩 표시
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        총 {totalPosts}개 게시글 중 {currentPage}페이지
      </div>

      <div className="pagination">
        {/* 이전 페이지 */}
        <button
          className={`pagination-btn prev ${!hasPrevPage ? "disabled" : ""}`}
          onClick={() => hasPrevPage && onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          ← 이전
        </button>

        {/* 페이지 번호들 */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "ellipsis" : ""}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        {/* 다음 페이지 */}
        <button
          className={`pagination-btn next ${!hasNextPage ? "disabled" : ""}`}
          onClick={() => hasNextPage && onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

export default React.memo(PostListPagination);
