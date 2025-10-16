import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PostListHeader from "./PostListHeader";
import PostListGrid from "./PostListGrid";
import PostListPagination from "./PostListPagination";
import { usePostList } from "../hooks/usePostList";
import "./PostList.css";

/**
 * 게시글 목록 페이지 컴포넌트
 * 전체 게시글 목록, 카테고리 필터링, 검색, 정렬, 페이지네이션 지원
 */
function PostList() {
  const { loading, filters, setFilters, pagination, setCurrentPage } =
    usePostList();

  return (
    <>
      <Header />
      <div className="post-list-page">
        <div className="container">
          <main className="post-list-main">
            {/* 헤더 */}
            <PostListHeader
              filters={filters}
              setFilters={setFilters}
              totalPosts={pagination.totalPosts}
            />

            {/* 게시글 그리드 */}
            <PostListGrid posts={pagination.currentPosts} loading={loading} />

            {/* 페이지네이션 */}
            <PostListPagination
              pagination={pagination}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostList;
