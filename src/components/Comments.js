import React from "react";
import "./Comments.css";
import { useComments } from "../hooks";
import { COMMENT_MESSAGES } from "../constants";

function Comments({ postId }) {
  const {
    comments,
    loading,
    formData,
    deletePassword,
    showDeleteInput,
    handleChange,
    handleSubmit,
    handleDelete,
    toggleDeleteInput,
    setDeletePassword,
  } = useComments(postId);

  return (
    <div className="comments-section">
      <h2 className="comments-title">💬 댓글 ({comments.length})</h2>

      {/* 댓글 작성 폼 */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            placeholder="이름"
            maxLength="20"
          />
          <input
            type="password"
            name="author_password"
            value={formData.author_password}
            onChange={handleChange}
            placeholder="비밀번호 (삭제 시 필요)"
            maxLength="20"
          />
        </div>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="댓글을 입력하세요..."
          rows="4"
          maxLength="500"
        />
        <button type="submit" className="btn-submit-comment">
          댓글 등록
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="comments-list">
        {loading ? (
          <div className="comment-loading">{COMMENT_MESSAGES.LOADING}</div>
        ) : comments.length === 0 ? (
          <div className="no-comments">{COMMENT_MESSAGES.NO_COMMENTS}</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.author_name}</span>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-actions">
                {!showDeleteInput[comment.id] ? (
                  <button
                    onClick={() => toggleDeleteInput(comment.id)}
                    className="btn-delete-toggle"
                  >
                    삭제
                  </button>
                ) : (
                  <div className="delete-input-group">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={deletePassword[comment.id] || ""}
                      onChange={(e) =>
                        setDeletePassword({
                          ...deletePassword,
                          [comment.id]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        handleDelete(comment.id, comment.author_password)
                      }
                      className="btn-confirm-delete"
                    >
                      확인
                    </button>
                    <button
                      onClick={() => toggleDeleteInput(comment.id)}
                      className="btn-cancel-delete"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
