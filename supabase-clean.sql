-- posts 테이블 생성
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  summary TEXT,
  content TEXT,
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- consultations 테이블 생성
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  insurance_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 공개 정책 (발행된 게시글만 조회 가능)
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  USING (is_published = true);

-- 누구나 상담 신청 가능
CREATE POLICY "Anyone can insert consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- 샘플 데이터
INSERT INTO posts (title, category, summary, content, is_published, view_count)
VALUES
  ('자동차보험 할인 특약 총정리', '자동차보험', '최대 30% 절약 방법', '마일리지 특약, 블랙박스 할인 등 다양한 할인 방법을 소개합니다.', true, 1523),
  ('30대 직장인 필수 보험', '보험추천', '꼭 필요한 보험 5가지', '실손보험, 암보험, 종신보험 등 우선순위별 가입 가이드입니다.', true, 892),
  ('실손보험 청구 거절 대응법', '실손보험', '거절시 대처 방법', '거절 사유와 재심사 요청 방법을 안내합니다.', true, 2104);
