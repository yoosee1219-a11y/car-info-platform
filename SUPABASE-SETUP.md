# 🔧 Supabase 완벽 설정 가이드 (2024 최신)

> **출처:** [Supabase 공식 문서](https://supabase.com/docs)

## 📌 중요! 순서대로 진행하세요

---

## 1️⃣ Supabase 프로젝트 생성 (3분)

### 단계 1: 회원가입/로그인

1. **https://supabase.com** 접속
2. 우측 상단 **"Start your project"** 클릭
3. GitHub 계정으로 로그인 (추천) 또는 이메일 가입

### 단계 2: 조직 생성 (처음만)

1. 로그인 후 **"New organization"** 클릭
2. Organization name: `My Projects` (원하는 이름)
3. **"Create organization"** 클릭

### 단계 3: 프로젝트 생성

1. **"New project"** 클릭
2. 다음 정보 입력:

```
Name: insurepot
Database Password: [강력한 비밀번호 - 꼭 메모하세요!]
Region: Northeast Asia (Seoul) - ap-northeast-2
Pricing Plan: Free
```

3. **"Create new project"** 클릭
4. ⏳ 약 2분 대기 (프로젝트 생성 중...)

---

## 2️⃣ 데이터베이스 테이블 생성 (2가지 방법)

### 🎯 방법 A: Table Editor 사용 (초보자 추천)

#### posts 테이블 생성:

1. 왼쪽 메뉴 → **"Table Editor"** 클릭
2. **"Create a new table"** 클릭
3. 다음 정보 입력:

```
Name: posts
Description: 보험 정보 게시글
Enable Row Level Security (RLS): ✅ 체크
```

4. **Columns 추가:**

| Name         | Type        | Default Value     | Primary | Required | Additional |
| ------------ | ----------- | ----------------- | ------- | -------- | ---------- |
| id           | uuid        | gen_random_uuid() | ✅      | ✅       | -          |
| title        | text        | -                 | -       | ✅       | -          |
| category     | text        | -                 | -       | -        | -          |
| summary      | text        | -                 | -       | -        | -          |
| content      | text        | -                 | -       | -        | -          |
| view_count   | int4        | 0                 | -       | -        | -          |
| is_published | bool        | false             | -       | -        | -          |
| created_at   | timestamptz | now()             | -       | -        | -          |

5. **"Save"** 클릭

#### consultations 테이블 생성:

1. 다시 **"Create a new table"** 클릭
2. 정보 입력:

```
Name: consultations
Description: 상담 문의
Enable Row Level Security (RLS): ✅ 체크
```

3. **Columns 추가:**

| Name           | Type        | Default Value     | Primary | Required |
| -------------- | ----------- | ----------------- | ------- | -------- |
| id             | uuid        | gen_random_uuid() | ✅      | ✅       |
| name           | text        | -                 | -       | ✅       |
| phone          | text        | -                 | -       | ✅       |
| email          | text        | -                 | -       | -        |
| insurance_type | text        | -                 | -       | -        |
| message        | text        | -                 | -       | -        |
| status         | text        | 'pending'         | -       | -        |
| created_at     | timestamptz | now()             | -       | -        |

4. **"Save"** 클릭

---

### 🎯 방법 B: SQL Editor 사용 (빠름) ⭐ 추천

#### ⚠️ 중요: 순수 SQL만 복사하세요!

1. 왼쪽 메뉴 → **"SQL Editor"** 클릭
2. **"New query"** 클릭
3. 프로젝트 폴더에서 **`supabase-clean.sql`** 파일 열기
4. 파일 내용 **전체 복사** (Ctrl+A → Ctrl+C)
5. Supabase SQL Editor에 **붙여넣기** (Ctrl+V)

또는 아래 SQL을 복사하세요 (❌ 백틱 제외!):

---

**복사 시작 ↓↓↓**

```
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
```

**복사 끝 ↑↑↑**

---

6. **"Run"** 또는 **F5** 클릭
7. ✅ "Success. No rows returned" 메시지 확인

#### 🚫 흔한 실수

- ❌ 마크다운 백틱(```)까지 복사
- ❌ "```sql" 포함
- ✅ 순수 SQL 코드만 복사!

---

## 3️⃣ API 키 가져오기 (1분)

### 단계 1: Settings 접속

1. 왼쪽 메뉴 **⚙️ "Project Settings"** 클릭
2. 왼쪽 서브메뉴에서 **"API"** 클릭

### 단계 2: 정보 복사

아래 두 정보를 **메모장에 복사**하세요:

```
Project URL:
https://abcdefghijk.supabase.co
(여러분의 실제 URL)

anon public (Public):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg...
(여러분의 실제 anon key - 매우 긴 문자열)
```

⚠️ **주의:**

- `service_role` 키는 절대 사용하지 마세요! (보안 위험)
- `anon` 키만 프론트엔드에서 사용합니다

---

## 4️⃣ React 프로젝트에 연결

### 단계 1: 환경변수 파일 생성

**Windows PowerShell:**

```powershell
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
notepad .env.local
```

### 단계 2: API 정보 입력

아래 내용을 복사하고, **실제 값으로 교체**하세요:

```env
REACT_APP_SUPABASE_URL=https://abcdefghijk.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ctrl+S**로 저장하고 닫기

---

## 5️⃣ 테스트 (2분)

### 단계 1: 개발 서버 시작

```bash
npm start
```

### 단계 2: Supabase 연결 확인

1. **http://localhost:3000** 접속
2. 브라우저 개발자 도구 열기 (**F12**)
3. **Console** 탭 확인
4. 오류 메시지가 없으면 ✅ 성공!

### 단계 3: 게시글 확인

1. 메인 페이지 스크롤
2. **"보험 완벽 가이드"** 섹션 확인
3. 3개 샘플 게시글이 보이면 ✅ 성공!

만약 샘플 데이터가 안 보이면:

- Supabase 대시보드 → Table Editor → posts 테이블 확인
- `is_published` 컬럼이 `true`인지 확인

### 단계 4: 상담 신청 테스트

1. 하단 상담 신청 폼에 정보 입력:
   - 이름: `테스트`
   - 전화번호: `010-1234-5678`
2. **"상담 신청하기"** 클릭
3. 성공 메시지가 뜨면 ✅ 성공!

4. Supabase에서 확인:
   - Table Editor → consultations 테이블
   - 방금 입력한 데이터 확인

---

## 6️⃣ RLS 정책 확인 (선택사항)

### RLS가 뭔가요?

- Row Level Security = 행 단위 보안
- 누가 어떤 데이터를 볼 수 있는지 제어

### 확인 방법:

1. Table Editor → posts 테이블
2. 우측 상단 **🛡️ "RLS"** 버튼 클릭
3. 정책 목록 확인:
   - ✅ "Public can view published posts"

---

## 🐛 문제 해결

### ❌ "Failed to fetch" 오류

**원인:** API URL 또는 Key가 잘못됨

**해결:**

1. `.env.local` 파일 확인
2. Supabase 대시보드에서 API 정보 다시 복사
3. 개발 서버 재시작:
   ```bash
   Ctrl+C
   npm start
   ```

---

### ❌ 게시글이 안 보임

**원인:** RLS 정책 또는 데이터 문제

**해결 1: 정책 확인**

```sql
-- SQL Editor에서 실행
SELECT * FROM posts WHERE is_published = true;
```

데이터가 보이면 RLS 정책 문제입니다.

**해결 2: 정책 재생성**

```sql
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Public can view published posts" ON posts;

-- 새 정책 생성
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  USING (is_published = true);
```

---

### ❌ 상담 신청이 안됨

**원인:** RLS 정책 누락

**해결:**

```sql
-- consultations 정책 확인
CREATE POLICY "Anyone can insert consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);
```

---

## ✅ 완료 체크리스트

설정이 완료되면 아래 항목을 확인하세요:

- [ ] Supabase 프로젝트 생성 완료
- [ ] posts 테이블 생성 및 샘플 데이터 확인
- [ ] consultations 테이블 생성 확인
- [ ] API URL과 Key 복사 완료
- [ ] .env.local 파일 생성 및 저장
- [ ] npm start로 로컬 서버 실행
- [ ] 메인 페이지에서 게시글 3개 확인
- [ ] 상담 신청 폼 테스트 성공
- [ ] Supabase 대시보드에서 상담 데이터 확인

---

## 📚 다음 단계

Supabase 설정이 완료되면:

1. **QUICK-START-NEW.md** 파일 참조
2. 추가 기능 개발
3. Vercel 배포

---

## 🔗 참고 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript/introduction)
- [RLS 정책 가이드](https://supabase.com/docs/guides/auth/row-level-security)

**성공을 응원합니다! 🚀**
