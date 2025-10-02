import React, { useState } from "react";
import PasswordChange from "./PasswordChange";
import "./Admin.css";
import {
  POST_CATEGORY_LIST,
  POST_MESSAGES,
  CONSULTATION_STATUS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../constants";
import { useAdmin } from "../hooks";

function Admin({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const {
    posts,
    consultations,
    loading,
    editingId,
    formData,
    handleFormChange,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    updateConsultationStatus,
  } = useAdmin();

  return (
    <div className="admin-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <h2>🏦 보험이지 관리자</h2>
        <div
          className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <span>📊</span> 대시보드
        </div>
        <div
          className={`menu-item ${activeTab === "content" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          <span>📝</span> 콘텐츠 관리
        </div>
        <div
          className={`menu-item ${
            activeTab === "consultations" ? "active" : ""
          }`}
          onClick={() => setActiveTab("consultations")}
        >
          <span>💬</span> 상담 문의
        </div>
        <div
          className={`menu-item ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          <span>🔐</span> 비밀번호 변경
        </div>
        <div className="menu-item" onClick={() => (window.location.href = "/")}>
          <span>🏠</span> 메인으로
        </div>
        <div className="menu-item logout-item" onClick={onLogout}>
          <span>🚪</span> 로그아웃
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <>
            <div className="content-header">
              <h1>대시보드</h1>
              <p>보험이지 운영 현황을 한눈에 확인하세요</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>전체 게시글</h3>
                <div className="stat-number">{posts.length}</div>
              </div>
              <div className="stat-card">
                <h3>상담 문의</h3>
                <div className="stat-number">{consultations.length}</div>
                <div className="stat-change">
                  대기중:{" "}
                  {
                    consultations.filter(
                      (c) => c.status === CONSULTATION_STATUS.PENDING
                    ).length
                  }
                  건
                </div>
              </div>
              <div className="stat-card">
                <h3>발행된 글</h3>
                <div className="stat-number">
                  {posts.filter((p) => p.is_published).length}
                </div>
              </div>
              <div className="stat-card">
                <h3>임시 저장</h3>
                <div className="stat-number">
                  {posts.filter((p) => !p.is_published).length}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "content" && (
          <>
            <div className="content-header">
              <h1>콘텐츠 관리 시스템</h1>
              <p>보험 정보 글을 작성하고 관리하세요</p>
            </div>

            <div className="editor-section">
              <h2>
                {editingId ? "📝 보험 정보 글 수정" : "✍️ 새 보험 정보 글 작성"}
              </h2>
              {editingId && (
                <div className="edit-notice">
                  게시글을 수정하고 있습니다.{" "}
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-cancel-edit"
                  >
                    취소
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>카테고리 선택</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    {POST_CATEGORY_LIST.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>제목</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="예: 2024년 자동차보험 할인 특약 총정리"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>본문 내용</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="content-textarea"
                    placeholder="본문 내용을 입력하세요..."
                    rows="15"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_published"
                      checked={formData.is_published}
                      onChange={handleFormChange}
                    />{" "}
                    즉시 발행
                  </label>
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "수정하기" : "게시하기"}
                  </button>
                  {editingId ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      취소
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      초기화
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* 게시글 목록 */}
            <div className="content-list" style={{ marginTop: "3rem" }}>
              <div className="list-header">
                <h3>전체 게시글 ({posts.length})</h3>
              </div>

              {loading ? (
                <div className="loading">{POST_MESSAGES.LOADING}</div>
              ) : posts.length === 0 ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  {POST_MESSAGES.NO_POSTS}
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="list-item">
                    <div className="item-info">
                      <h3>
                        {post.title}
                        {!post.is_published && (
                          <span
                            style={{
                              color: "#f59e0b",
                              fontSize: "0.8rem",
                              marginLeft: "0.5rem",
                            }}
                          >
                            (임시저장)
                          </span>
                        )}
                      </h3>
                      <div className="item-meta">
                        {post.category} |{" "}
                        {new Date(post.created_at).toLocaleDateString()} | 조회{" "}
                        {post.view_count || 0}
                      </div>
                    </div>
                    <div className="item-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(post)}
                      >
                        수정
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(post.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "consultations" && (
          <>
            <div className="content-header">
              <h1>상담 문의 관리</h1>
              <p>고객 상담 요청을 확인하고 처리하세요</p>
            </div>

            <div className="content-list">
              <div className="list-header">
                <h3>전체 상담 문의 ({consultations.length})</h3>
              </div>

              {loading ? (
                <div className="loading">{POST_MESSAGES.LOADING}</div>
              ) : consultations.length === 0 ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  아직 상담 문의가 없습니다.
                </div>
              ) : (
                consultations.map((consult) => (
                  <div key={consult.id} className="list-item">
                    <div className="item-info">
                      <h3>
                        {consult.name} - {consult.insurance_type}
                      </h3>
                      <div className="item-meta">
                        📞 {consult.phone} | ✉️ {consult.email || "이메일 없음"}
                      </div>
                      <div style={{ marginTop: "0.5rem", color: "#666" }}>
                        {consult.message || "메시지 없음"}
                      </div>
                      <div
                        className="item-meta"
                        style={{ marginTop: "0.5rem" }}
                      >
                        상태:{" "}
                        <span
                          style={{
                            color: STATUS_COLORS[consult.status],
                          }}
                        >
                          {STATUS_LABELS[consult.status]}
                        </span>{" "}
                        | {new Date(consult.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className="item-actions">
                      <select
                        value={consult.status}
                        onChange={(e) =>
                          updateConsultationStatus(consult.id, e.target.value)
                        }
                        style={{ padding: "0.5rem", borderRadius: "6px" }}
                      >
                        <option value={CONSULTATION_STATUS.PENDING}>
                          {STATUS_LABELS[CONSULTATION_STATUS.PENDING]}
                        </option>
                        <option value={CONSULTATION_STATUS.IN_PROGRESS}>
                          {STATUS_LABELS[CONSULTATION_STATUS.IN_PROGRESS]}
                        </option>
                        <option value={CONSULTATION_STATUS.COMPLETED}>
                          {STATUS_LABELS[CONSULTATION_STATUS.COMPLETED]}
                        </option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "password" && <PasswordChange />}
      </main>
    </div>
  );
}

export default Admin;
