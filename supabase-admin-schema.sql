-- 관리자 계정 테이블 추가
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- 1. 관리자 계정 테이블 생성
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS (Row Level Security) 정책 활성화
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. 공개 정책 설정 (읽기만 가능, 민감 정보 제외)
CREATE POLICY "Anyone can read admin usernames" ON admin_users
  FOR SELECT USING (true);

-- 4. 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. 초기 관리자 계정 삽입 (bcrypt 해시: dbsdudgns0))
-- 주의: 이 해시는 임시입니다. 앱에서 비밀번호를 변경하세요.
INSERT INTO admin_users (username, password_hash) 
VALUES ('stryper11', '$2b$10$i/bbAAfAqrI5K./hKI13COuLm0QzgA3uqC8Lt2LnuHHwa9PZxHBki')
ON CONFLICT (username) DO NOTHING;

-- 완료!
-- 이제 관리자 계정이 Supabase에 저장됩니다.
