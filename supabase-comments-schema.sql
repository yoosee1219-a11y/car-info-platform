-- 댓글 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_password TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);

-- RLS 활성화
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 누구나 댓글 조회 가능
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  USING (true);

-- 누구나 댓글 작성 가능
CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- 비밀번호가 일치하면 삭제 가능 (앱에서 처리)
CREATE POLICY "Anyone can delete their comments"
  ON comments FOR DELETE
  USING (true);

-- 조회수 증가 함수 (이미 있으면 스킵)
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 완료!
