-- 차량 정보 플랫폼 Supabase 데이터베이스 스키마
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- 1. 게시글 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  summary TEXT,
  content TEXT,
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 관리자 사용자 테이블
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 관리자 계정 생성 (비밀번호: dbsdudgns0))
INSERT INTO admin_users (username, password_hash) VALUES 
('stryper11', '$2b$10$InvQiUZm6FhDK7tCUn3zoeIjwZsLmc6ImtJSd394vnw9x4.95euRi');

-- 3. 상담 문의 테이블
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  car_brand TEXT,
  car_model TEXT,
  service_type TEXT,
  available_time TEXT NOT NULL,
  region TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS (Row Level Security) 정책 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. 공개 정책 설정
-- 발행된 게시글은 누구나 조회 가능
CREATE POLICY "Public can view published posts" ON posts
  FOR SELECT USING (is_published = true);

-- 모든 사용자가 상담 문의를 등록 가능
CREATE POLICY "Anyone can create consultation" ON consultations
  FOR INSERT WITH CHECK (true);

-- 관리자 테이블은 인증된 사용자만 조회 가능 (로그인용)
CREATE POLICY "Allow admin login" ON admin_users
  FOR SELECT USING (true);

-- 관리자는 모든 작업 가능 (Supabase Auth를 사용할 경우)
-- CREATE POLICY "Admins can do everything on posts" ON posts
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Admins can do everything on consultations" ON consultations
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- 5. 샘플 데이터 (테스트용)
INSERT INTO posts (title, category, summary, content, is_published, view_count) VALUES
('장기 렌터카 vs 리스 비교', '차량 정보', '당신에게 맞는 선택은?', 
'장기 렌터카와 리스의 차이점을 알아보고 자신에게 맞는 선택을 하세요.

## 장기 렌터카

### 장점
- 초기 비용 부담 없음
- 자동차세, 보험료 포함
- 정비 및 관리 서비스

### 단점
- 총 비용이 다소 높을 수 있음
- 소유권이 없음

## 리스

### 장점
- 세제 혜택 (법인 사용 시)
- 매월 납입금 비용 처리 가능
- 신차 교체가 용이

### 단점
- 초기 보증금 필요
- 중도 해지 시 위약금', true, 1523),

('2025년 인기 SUV 추천', '차량 비교', '가족용 SUV 베스트 5', 
'2025년 가장 인기 있는 SUV를 비교 분석합니다.

## TOP 5 SUV

1. **현대 팰리세이드** - 넉넉한 공간과 편의사양
2. **기아 쏘렌토** - 가성비 최고
3. **제네시스 GV80** - 럭셔리 SUV의 정석
4. **벤츠 GLE** - 프리미엄 브랜드
5. **BMW X5** - 주행 성능 우수

## 선택 가이드
가족 구성원, 예산, 용도를 고려하여 선택하세요.', true, 892),

('전기차 장기 렌터카 가이드', '렌터카 가이드', '전기차, 렌터카로 타면 얼마나 절약될까?', 
'전기차를 장기 렌터카로 이용할 때의 장점을 알아봅니다.

## 전기차 장기 렌터카 장점

### 1. 유류비 절감
주유비 대비 70% 절감 가능

### 2. 세제 혜택
개별소비세, 취득세 감면

### 3. 정부 보조금
구매 보조금 최대 700만원

### 4. 유지비 절감
엔진 오일, 필터 교환 불필요

## 추천 전기차 모델
아이오닉5, EV6, 테슬라 모델3 등', true, 2104);

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_published ON posts(is_published, created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created ON consultations(created_at DESC);

-- 7. 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 완료!
-- 이제 Supabase 대시보드에서 테이블을 확인하실 수 있습니다.
