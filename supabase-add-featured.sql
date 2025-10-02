-- ================================================
-- 인기글 기능 추가를 위한 Supabase Migration
-- ================================================

-- 1. posts 테이블에 is_featured 컬럼 추가
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 2. is_featured 컬럼에 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_posts_is_featured 
ON posts(is_featured) WHERE is_featured = true;

-- 3. view_count 컬럼 확인 및 기본값 설정 (이미 있으면 무시)
-- ALTER TABLE posts
-- ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 4. view_count 인덱스 추가 (정렬 성능 최적화)
CREATE INDEX IF NOT EXISTS idx_posts_view_count 
ON posts(view_count DESC);

-- 5. 조회수 증가 함수 (없으면 생성)
CREATE OR REPLACE FUNCTION increment_view_count(post_id INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE posts
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = post_id;
END;
$$;

-- 6. 확인 쿼리 (실행 후 결과 확인)
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'posts'
  AND column_name IN ('view_count', 'is_featured')
ORDER BY column_name;

-- ================================================
-- 사용 예시:
-- ================================================

-- 인기글로 설정
-- UPDATE posts SET is_featured = true WHERE id = 1;

-- 인기글 해제
-- UPDATE posts SET is_featured = false WHERE id = 1;

-- 인기글 목록 조회 (조회수 순)
-- SELECT id, title, view_count, is_featured
-- FROM posts
-- WHERE is_featured = true AND is_published = true
-- ORDER BY view_count DESC
-- LIMIT 5;

-- 조회수 직접 설정
-- UPDATE posts SET view_count = 5000 WHERE id = 1;

