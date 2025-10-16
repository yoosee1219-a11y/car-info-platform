import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import PasswordChange from "./PasswordChange";
import ContentQualityChecker from "./ContentQualityChecker";
import "./Admin.css";
import {
  POST_CATEGORY_LIST,
  POST_MESSAGES,
  CONSULTATION_STATUS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../constants";
import { useAdmin } from "../hooks";
import { imageUploadService } from "../services";

// CustomImage Extension - 크기 및 정렬 속성 추가
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
      align: {
        default: "center",
        parseHTML: (element) =>
          element.getAttribute("data-align") || element.style.textAlign,
        renderHTML: (attributes) => {
          if (!attributes.align) return {};
          return {
            "data-align": attributes.align,
            class: `image-align-${attributes.align}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageSize:
        (size) =>
        ({ commands }) => {
          return commands.updateAttributes("image", { width: size });
        },
      setImageAlign:
        (align) =>
        ({ commands }) => {
          return commands.updateAttributes("image", { align });
        },
    };
  },
});

// TipTap 툴바 컴포넌트
const MenuBar = ({ editor }) => {
  const [showImageControls, setShowImageControls] = useState(false);

  // 이미지 선택 감지
  useEffect(() => {
    if (!editor) return;

    const updateToolbar = () => {
      const { selection } = editor.state;
      const node = editor.state.doc.nodeAt(selection.from);
      const isImageSelected =
        node?.type.name === "image" || editor.isActive("image");
      setShowImageControls(isImageSelected);
    };

    editor.on("selectionUpdate", updateToolbar);
    editor.on("transaction", updateToolbar);

    updateToolbar(); // 초기 상태 체크

    return () => {
      editor.off("selectionUpdate", updateToolbar);
      editor.off("transaction", updateToolbar);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-toolbar">
      {/* 텍스트 스타일 */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="굵게"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="기울임"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="취소선"
      >
        <s>S</s>
      </button>

      <span className="toolbar-divider">|</span>

      {/* 제목 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title="제목 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        title="제목 3"
      >
        H3
      </button>

      <span className="toolbar-divider">|</span>

      {/* 리스트 */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="글머리 기호"
      >
        •
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="번호 매기기"
      >
        1.
      </button>

      <span className="toolbar-divider">|</span>

      {/* 인용구 & 코드 */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title="인용구"
      >
        ❝
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title="코드 블록"
      >
        {"</>"}
      </button>

      <span className="toolbar-divider">|</span>

      {/* 링크 */}
      <button
        onClick={() => {
          const url = window.prompt("URL을 입력하세요:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive("link") ? "is-active" : ""}
        title="링크"
      >
        🔗
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        title="링크 제거"
      >
        ✂️
      </button>

      <span className="toolbar-divider">|</span>

      {/* 이미지 - URL 입력 */}
      <button
        onClick={() => {
          const url = window.prompt("이미지 URL을 입력하세요:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        title="이미지 URL 삽입"
      >
        🔗
      </button>

      {/* 이미지 - 파일 업로드 */}
      <label
        className="editor-toolbar-upload"
        title="이미지 파일 업로드 (최대 5MB)"
        style={{
          padding: "6px 10px",
          border: "1px solid #d1d5db",
          background: "white",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          minWidth: "32px",
          height: "32px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          margin: "0 2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f3f4f6";
          e.currentTarget.style.borderColor = "#9ca3af";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "#d1d5db";
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
              // 로딩 표시
              const loadingText = "[📤 이미지 업로드 중...]";
              editor.chain().focus().insertContent(loadingText).run();

              console.log("🚀 이미지 업로드 시작:", file.name);

              // Supabase Storage에 업로드
              const result = await imageUploadService.uploadImage(file);

              // 로딩 텍스트 제거
              editor.chain().focus().undo().run();

              if (result.success && result.url) {
                console.log("✅ 업로드 성공! URL:", result.url);
                // 이미지 삽입
                editor.chain().focus().setImage({ src: result.url }).run();
              } else {
                console.error("❌ 업로드 실패:", result.error);
                toast.error(result.error || "이미지 업로드에 실패했습니다.");
              }
            } catch (error) {
              console.error("💥 업로드 중 오류:", error);
              editor.chain().focus().undo().run();
              toast.error("이미지 업로드 중 오류가 발생했습니다.");
            }

            // 입력 초기화 (같은 파일 재선택 가능하도록)
            e.target.value = "";
          }}
        />
        📤
      </label>

      <span className="toolbar-divider">|</span>

      {/* 이미지 정렬 컨트롤 */}
      {showImageControls && (
        <>
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: "4px 8px",
              background: "#e3f2fd",
              borderRadius: "6px",
              border: "1px solid #90caf9",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#1976d2", marginRight: "4px" }}
            >
              정렬:
            </span>
            <button
              onClick={() => editor.chain().focus().setImageAlign("left").run()}
              title="왼쪽 정렬"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ⬅️
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setImageAlign("center").run()
              }
              title="가운데 정렬"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ⬆️
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setImageAlign("right").run()
              }
              title="오른쪽 정렬"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ➡️
            </button>
          </div>

          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: "4px 8px",
              background: "#f3e5f5",
              borderRadius: "6px",
              border: "1px solid #ce93d8",
              marginLeft: "8px",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#7b1fa2", marginRight: "4px" }}
            >
              크기:
            </span>
            <button
              onClick={() => editor.chain().focus().setImageSize("25%").run()}
              title="25% 크기"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #ce93d8",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              S
            </button>
            <button
              onClick={() => editor.chain().focus().setImageSize("50%").run()}
              title="50% 크기"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #ce93d8",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              M
            </button>
            <button
              onClick={() => editor.chain().focus().setImageSize("75%").run()}
              title="75% 크기"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #ce93d8",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              L
            </button>
            <button
              onClick={() => editor.chain().focus().setImageSize("100%").run()}
              title="100% 크기"
              style={{
                padding: "4px 8px",
                background: "white",
                border: "1px solid #ce93d8",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              XL
            </button>
          </div>

          <span className="toolbar-divider">|</span>
        </>
      )}

      {/* 표 */}
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        title="표 삽입"
      >
        📊
      </button>

      <span className="toolbar-divider">|</span>

      {/* 실행 취소/다시 실행 */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="실행 취소"
      >
        ↩️
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="다시 실행"
      >
        ↪️
      </button>

      <span className="toolbar-divider">|</span>

      {/* 모두 지우기 */}
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        title="서식 지우기"
      >
        🧹
      </button>
    </div>
  );
};

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

  // TipTap 에디터 초기화
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: formData.content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleFormChange({
        target: {
          name: "content",
          value: html,
        },
      });
    },
  });

  // formData.content가 변경될 때 에디터 내용 업데이트 (수정 모드)
  useEffect(() => {
    if (editor && formData.content !== editor.getHTML()) {
      editor.commands.setContent(formData.content || "");
    }
  }, [editor, formData.content, editingId]);

  // 폼 제출 핸들러 (기존 handleSubmit 래핑)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    // 제출 후 에디터 초기화
    if (editor) {
      editor.commands.clearContent();
    }
  };

  // 취소 핸들러 (에디터 초기화 포함)
  const handleCancel = () => {
    handleCancelEdit();
    if (editor) {
      editor.commands.clearContent();
    }
  };

  return (
    <div className="admin-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <h2>🚗 카인포 관리자</h2>
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
              <p>카인포 운영 현황을 한눈에 확인하세요</p>
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
              <p>차량 정보 글을 작성하고 관리하세요 (TipTap 에디터)</p>
            </div>

            <div className="editor-section">
              <h2>
                {editingId ? "📝 차량 정보 글 수정" : "✍️ 새 차량 정보 글 작성"}
              </h2>
              {editingId && (
                <div className="edit-notice">
                  게시글을 수정하고 있습니다.{" "}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-cancel-edit"
                  >
                    취소
                  </button>
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
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
                    placeholder="예: 2025년 인기 SUV 추천 베스트 5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>본문 내용 (HTML 에디터)</label>
                  <div className="tiptap-editor-wrapper">
                    <MenuBar editor={editor} />
                    <EditorContent
                      editor={editor}
                      className="tiptap-editor-content"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginTop: "10px",
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    💡 팁: 이미지 업로드, 표, 리스트, 제목 스타일 등 다양한
                    서식을 사용할 수 있습니다. SEO를 위해 H2, H3 태그를
                    활용해주세요.
                  </div>
                </div>

                {/* 조회수 및 인기글 설정 */}
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>조회수 (직접 입력 가능)</label>
                    <input
                      type="number"
                      name="view_count"
                      value={formData.view_count || 0}
                      onChange={handleFormChange}
                      min="0"
                      placeholder="0"
                      style={{
                        padding: "0.75rem",
                        fontSize: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                      }}
                    />
                    <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                      💡 관리자가 직접 조회수를 설정할 수 있습니다
                    </small>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label>인기글 설정</label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        background: formData.is_featured
                          ? "#fef3c7"
                          : "#f9fafb",
                        border: formData.is_featured
                          ? "2px solid #f59e0b"
                          : "2px solid #e5e7eb",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured || false}
                        onChange={handleFormChange}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span style={{ fontWeight: 500 }}>
                        {formData.is_featured
                          ? "⭐ 인기글로 표시"
                          : "인기글 설정"}
                      </span>
                    </label>
                    <small style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                      💡 메인 페이지 인기글 섹션에 우선 표시됩니다
                    </small>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      background: "#f9fafb",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="is_published"
                      checked={formData.is_published}
                      onChange={handleFormChange}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ fontWeight: 500, fontSize: "1rem" }}>
                      즉시 발행
                    </span>
                  </label>
                  <small
                    style={{
                      color: "#6b7280",
                      fontSize: "0.85rem",
                      marginTop: "0.5rem",
                      display: "block",
                    }}
                  >
                    💡 체크하면 바로 발행되며, 해제하면 임시저장됩니다
                  </small>
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "수정하기" : "게시하기"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    {editingId ? "취소" : "초기화"}
                  </button>
                </div>
              </form>
            </div>

            {/* 콘텐츠 품질 체커 */}
            <ContentQualityChecker
              content={editor?.getHTML() || ""}
              title={formData.title}
              onScreenshot={(fileName, dataUrl) => {
                console.log("스크린샷 저장됨:", fileName);
                toast.success(`스크린샷이 저장되었습니다: ${fileName}`);
              }}
            />

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
                        {post.is_featured && (
                          <span
                            style={{
                              color: "#f59e0b",
                              fontSize: "1.2rem",
                              marginRight: "0.5rem",
                            }}
                            title="인기글"
                          >
                            ⭐
                          </span>
                        )}
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
                        {post.is_featured && (
                          <span
                            style={{
                              color: "#f59e0b",
                              marginLeft: "0.5rem",
                              fontWeight: "600",
                            }}
                          >
                            | ⭐ 인기글
                          </span>
                        )}
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
                        {consult.name} - {consult.car_brand}{" "}
                        {consult.car_model || ""}
                      </h3>
                      <div className="item-meta">
                        📞 {consult.phone} | ✉️ {consult.email || "이메일 없음"}
                      </div>
                      <div
                        className="item-meta"
                        style={{ marginTop: "0.5rem" }}
                      >
                        🚗 {consult.service_type} | 🕐 {consult.available_time}{" "}
                        | 📍 {consult.region}
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
