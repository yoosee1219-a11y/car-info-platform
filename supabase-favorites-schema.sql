-- 찜하기(즐겨찾기) 테이블
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_identifier TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_identifier, insurance_type)
);

-- 인덱스 추가 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_identifier);
CREATE INDEX IF NOT EXISTS idx_favorites_type ON favorites(insurance_type);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 자신의 찜하기를 조회할 수 있도록
CREATE POLICY "누구나 찜하기 조회 가능"
  ON favorites FOR SELECT
  USING (true);

-- 모든 사용자가 찜하기를 추가할 수 있도록
CREATE POLICY "누구나 찜하기 추가 가능"
  ON favorites FOR INSERT
  WITH CHECK (true);

-- 모든 사용자가 자신의 찜하기를 삭제할 수 있도록
CREATE POLICY "누구나 찜하기 삭제 가능"
  ON favorites FOR DELETE
  USING (true);

-- 테이블 설명 추가
COMMENT ON TABLE favorites IS '사용자의 보험 찜하기(즐겨찾기) 정보';
COMMENT ON COLUMN favorites.user_identifier IS '사용자 식별자 (세션 ID 또는 로컬스토리지 ID)';
COMMENT ON COLUMN favorites.insurance_type IS '보험 종류 (auto, health, family, cancer, fire, child, pet, driver)';

