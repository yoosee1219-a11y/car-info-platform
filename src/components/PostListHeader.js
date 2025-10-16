/**
 * 게시글 목록 헤더 컴포넌트
 * 검색바, 카테고리 필터, 정렬 옵션
 */

import React from "react";
import { POST_CATEGORY_LIST } from "../constants";

/**
 * 게시글 목록 헤더 컴포넌트
 * @param {Object} filters - 현재 필터 상태
 * @param {Object} setFilters - 필터 변경 함수들
 * @param {number} totalPosts - 전체 게시글 수
 */
function PostListHeader({ filters, setFilters, totalPosts }) {
  return (
    <div className="post-list-header">
      <div className="header-content">
        <h1>자동차 정보</h1>
        <p className="header-description">
          다양한 자동차 정보와 유용한 팁을 확인하세요
        </p>
        <div className="post-count">총 {totalPosts}개의 게시글</div>
      </div>

      {/* 검색바 */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="게시글 검색..."
            value={filters.searchQuery}
            onChange={(e) => setFilters.setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
      </div>

      {/* 필터 및 정렬 */}
      <div className="filter-section">
        {/* 카테고리 필터 */}
        <div className="category-filter">
          <div className="filter-label">카테고리</div>
          <div className="category-buttons">
            {["전체", ...POST_CATEGORY_LIST].map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  filters.selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setFilters.setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="sort-filter">
          <div className="filter-label">정렬</div>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters.setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostListHeader);
