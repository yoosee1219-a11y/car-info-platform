/**
 * 게시글 목록 Hook
 * 데이터 로딩, 검색, 필터링, 페이지네이션 로직
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { postService } from "../services";
import { devError } from "../utils/logger";
import { useDebounce } from "./useDebounce";

/**
 * 게시글 목록 Hook
 * @returns {Object} { posts, loading, filters, setFilters, pagination, filteredPosts }
 */
export function usePostList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 관리
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 필터 상태
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "전체"
  );
  const [sortBy, setSortBy] = useState("latest"); // latest, popular
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // 검색어 디바운스 (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await postService.fetchPublished();

      if (result.success) {
        setPosts(result.data);
      } else {
        devError("게시글 로딩 실패:", result.error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  // URL 파라미터 동기화
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // 필터링 및 정렬
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // 검색 필터 (디바운스된 검색어 사용)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 정렬
    switch (sortBy) {
      case "latest":
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "popular":
        filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [posts, selectedCategory, debouncedSearchQuery, sortBy]);

  // 페이지네이션
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      totalPages,
      currentPage,
      postsPerPage,
      currentPosts,
      totalPosts: filteredPosts.length,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [filteredPosts, currentPage, postsPerPage]);

  // 필터 변경 핸들러
  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setCurrentPage(1);

      const newParams = new URLSearchParams(searchParams);
      if (category === "전체") {
        newParams.delete("category");
      } else {
        newParams.set("category", category);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback(
    (query) => {
      setSearchQuery(query);
      setCurrentPage(1);

      const newParams = new URLSearchParams(searchParams);
      if (query.trim()) {
        newParams.set("search", query);
      } else {
        newParams.delete("search");
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    posts,
    loading,
    filters: {
      selectedCategory,
      sortBy,
      searchQuery,
    },
    setFilters: {
      setSelectedCategory: handleCategoryChange,
      setSortBy: handleSortChange,
      setSearchQuery: handleSearchChange,
    },
    pagination,
    setCurrentPage: handlePageChange,
    filteredPosts,
  };
}
