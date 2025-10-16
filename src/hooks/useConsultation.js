/**
 * 상담 신청 훅
 * 상담 신청 폼 제출을 처리
 */

import toast from "react-hot-toast";
import { consultationService } from "../services";
import { CONSULTATION_MESSAGES } from "../constants";

export function useConsultation() {
  const submitConsultation = async (formData) => {
    const result = await consultationService.create(formData);

    if (result.success) {
      toast.success(CONSULTATION_MESSAGES.CREATE_SUCCESS);
      return true;
    } else {
      toast.success(result.error);
      return false;
    }
  };

  return { submitConsultation };
}
