/**
 * 댓글 관련 상태 관리 훅
 * 댓글 조회, 작성, 삭제를 처리
 */

import { useState, useEffect, useCallback } from "react";
import bcrypt from "bcryptjs";
import { commentService } from "../services";
import { COMMENT_FORM_DEFAULTS, COMMENT_MESSAGES } from "../constants";

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(COMMENT_FORM_DEFAULTS);
  const [deletePassword, setDeletePassword] = useState({});
  const [showDeleteInput, setShowDeleteInput] = useState({});

  // 댓글 가져오기
  const fetchComments = useCallback(async () => {
    const result = await commentService.fetchByPostId(postId);

    if (result.success) {
      setComments(result.data);
    } else {
      console.error("댓글 로딩 오류:", result.error);
    }

    setLoading(false);
  }, [postId]);

  // 초기 로드
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 폼 데이터 변경
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 댓글 작성
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !formData.author_name ||
        !formData.author_password ||
        !formData.content
      ) {
        alert(COMMENT_MESSAGES.REQUIRED_FIELDS);
        return;
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(formData.author_password, 10);

      const commentData = {
        post_id: postId,
        author_name: formData.author_name,
        author_password: hashedPassword,
        content: formData.content,
      };

      const result = await commentService.create(commentData);

      if (result.success) {
        alert(COMMENT_MESSAGES.CREATE_SUCCESS);
        setFormData(COMMENT_FORM_DEFAULTS);
        fetchComments();
      } else {
        alert(result.error);
      }
    },
    [formData, postId, fetchComments]
  );

  // 댓글 삭제
  const handleDelete = useCallback(
    async (commentId, hashedPassword) => {
      const password = deletePassword[commentId];

      if (!password) {
        alert(COMMENT_MESSAGES.PASSWORD_REQUIRED);
        return;
      }

      try {
        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
          alert(COMMENT_MESSAGES.PASSWORD_MISMATCH);
          return;
        }

        if (!window.confirm(COMMENT_MESSAGES.DELETE_CONFIRM)) return;

        const result = await commentService.delete(commentId);

        if (result.success) {
          alert(COMMENT_MESSAGES.DELETE_SUCCESS);
          setShowDeleteInput({ ...showDeleteInput, [commentId]: false });
          setDeletePassword({ ...deletePassword, [commentId]: "" });
          fetchComments();
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error("댓글 삭제 오류:", error);
        alert(COMMENT_MESSAGES.DELETE_ERROR);
      }
    },
    [deletePassword, showDeleteInput, fetchComments]
  );

  // 삭제 입력창 토글
  const toggleDeleteInput = useCallback((commentId) => {
    setShowDeleteInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  return {
    // 상태
    comments,
    loading,
    formData,
    deletePassword,
    showDeleteInput,

    // 핸들러
    handleChange,
    handleSubmit,
    handleDelete,
    toggleDeleteInput,
    setDeletePassword,
  };
}
