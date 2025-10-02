import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Comments from "./Comments";
import TableOfContents from "./TableOfContents";
import "./PostDetail.css";
import { POST_MESSAGES } from "../constants";
import { usePostDetail } from "../hooks";
import {
  extractTableOfContents,
  addIdsToHeadings,
  textToHtml,
} from "../utils/contentParser";

function PostDetail() {
  const { id } = useParams();
  const { post, loading, categories, recentPosts, prevPost, nextPost } =
    usePostDetail(id);

  const [processedContent, setProcessedContent] = useState("");
  const [toc, setToc] = useState([]);

  // 페이지 진입시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // 콘텐츠 처리 및 목차 추출
  useEffect(() => {
    if (post?.content) {
      // HTML 콘텐츠인지 일반 텍스트인지 확인
      const isHtml = post.content.includes("<") && post.content.includes(">");

      let htmlContent = isHtml ? post.content : textToHtml(post.content);

      // 제목에 ID 추가
      htmlContent = addIdsToHeadings(htmlContent);

      // 목차 추출
      const tocData = extractTableOfContents(htmlContent);

      setProcessedContent(htmlContent);
      setToc(tocData);

      // 디버깅용 로그 (개발 중에만)
      if (process.env.NODE_ENV === "development") {
        console.log("📝 콘텐츠 처리 완료:", {
          isHtml,
          contentLength: post.content.length,
          tocItems: tocData.length,
          toc: tocData,
        });
      }
    }
  }, [post]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="post-detail-container">
          <div className="loading">{POST_MESSAGES.LOADING}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="post-detail-container">
        <div className="post-detail-layout">
          {/* 왼쪽 사이드바 */}
          <aside className="post-sidebar post-sidebar-left">
            <div className="sidebar-section">
              <h3>📚 보험 완벽 가이드</h3>
              <div className="category-list">
                <Link to="/" className="category-item all">
                  전체보기
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className={`category-item ${
                      post.category === cat.name ? "active" : ""
                    }`}
                  >
                    {cat.name}
                    <span className="count">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>📌 최근 게시글</h3>
              <div className="recent-posts">
                {recentPosts.map((recentPost) => (
                  <Link
                    key={recentPost.id}
                    to={`/post/${recentPost.id}`}
                    className={`recent-post-item ${
                      recentPost.id === id ? "active" : ""
                    }`}
                  >
                    <div className="recent-post-title">{recentPost.title}</div>
                    <div className="recent-post-date">
                      {new Date(recentPost.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="post-main">
            <article className="post-content">
              <div className="post-header">
                <div className="post-category">{post.category}</div>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                  <span>
                    📅 {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span>👁️ {post.view_count || 0} 조회</span>
                </div>
              </div>

              <div
                className="post-body"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </article>

            {/* 이전글/다음글 네비게이션 */}
            <div className="post-navigation">
              {prevPost && (
                <Link to={`/post/${prevPost.id}`} className="nav-item prev">
                  <span className="nav-label">← 이전 글</span>
                  <span className="nav-title">{prevPost.title}</span>
                </Link>
              )}
              {nextPost && (
                <Link to={`/post/${nextPost.id}`} className="nav-item next">
                  <span className="nav-label">다음 글 →</span>
                  <span className="nav-title">{nextPost.title}</span>
                </Link>
              )}
            </div>

            {/* 댓글 섹션 */}
            <Comments postId={id} />

            {/* 목록으로 버튼 */}
            <div className="back-to-list">
              <Link to="/" className="btn-back">
                📋 목록으로 돌아가기
              </Link>
            </div>
          </main>

          {/* 오른쪽 사이드바 - 목차 */}
          <aside className="post-sidebar post-sidebar-right">
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetail;
