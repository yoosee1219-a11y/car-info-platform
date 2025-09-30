import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "../supabaseClient";
import "./Comments.css";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    author_name: "",
    author_password: "",
    content: "",
  });
  const [deletePassword, setDeletePassword] = useState({});
  const [showDeleteInput, setShowDeleteInput] = useState({});

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("댓글 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.author_name ||
      !formData.author_password ||
      !formData.content
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(formData.author_password, 10);

      const { error } = await supabase.from("comments").insert([
        {
          post_id: postId,
          author_name: formData.author_name,
          author_password: hashedPassword,
          content: formData.content,
        },
      ]);

      if (error) throw error;

      alert("댓글이 등록되었습니다!");
      setFormData({
        author_name: "",
        author_password: "",
        content: "",
      });
      fetchComments();
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (commentId, hashedPassword) => {
    const password = deletePassword[commentId];

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (!window.confirm("정말 삭제하시겠습니까?")) return;

      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      alert("댓글이 삭제되었습니다.");
      setShowDeleteInput({ ...showDeleteInput, [commentId]: false });
      setDeletePassword({ ...deletePassword, [commentId]: "" });
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const toggleDeleteInput = (commentId) => {
    setShowDeleteInput({
      ...showDeleteInput,
      [commentId]: !showDeleteInput[commentId],
    });
  };

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
          <div className="comment-loading">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="no-comments">첫 번째 댓글을 작성해보세요! 😊</div>
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
