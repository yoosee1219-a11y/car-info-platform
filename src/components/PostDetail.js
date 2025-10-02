import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "./Header";
import Footer from "./Footer";
import Comments from "./Comments";
import AdSidebar from "./AdSidebar";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchCategories();
    fetchRecentPosts();
    incrementViewCount();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();

      if (error) throw error;

      if (data) {
        setPost(data);
        fetchAdjacentPosts(data.created_at);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("게시글 로딩 오류:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdjacentPosts = async (currentDate) => {
    try {
      // 이전 글
      const { data: prevData } = await supabase
        .from("posts")
        .select("id, title")
        .eq("is_published", true)
        .lt("created_at", currentDate)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (prevData) setPrevPost(prevData);

      // 다음 글
      const { data: nextData } = await supabase
        .from("posts")
        .select("id, title")
        .eq("is_published", true)
        .gt("created_at", currentDate)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (nextData) setNextPost(nextData);
    } catch (error) {
      console.error("인접 게시글 로딩 오류:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("category")
        .eq("is_published", true);

      if (error) throw error;

      // 카테고리 중복 제거 및 카운트
      const categoryCount = {};
      data.forEach((post) => {
        if (post.category) {
          categoryCount[post.category] =
            (categoryCount[post.category] || 0) + 1;
        }
      });

      const categoryList = Object.entries(categoryCount).map(
        ([name, count]) => ({
          name,
          count,
        })
      );

      setCategories(categoryList);
    } catch (error) {
      console.error("카테고리 로딩 오류:", error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentPosts(data || []);
    } catch (error) {
      console.error("최근 게시글 로딩 오류:", error);
    }
  };

  const incrementViewCount = async () => {
    try {
      await supabase.rpc("increment_view_count", { post_id: id });
    } catch (error) {
      console.error("조회수 증가 오류:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="post-detail-container">
          <div className="loading">로딩 중...</div>
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
          {/* 사이드바 */}
          <aside className="post-sidebar">
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

              <div className="post-body">
                {post.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
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

          {/* 광고 사이드바 - AdSense 승인 대기 중 임시 비활성화 */}
          {/* <AdSidebar /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetail;
