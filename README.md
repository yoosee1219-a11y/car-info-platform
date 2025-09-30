# 🏦 인슈어팟 - 보험 비교 플랫폼

React + Supabase + Vercel로 구축된 보험 정보 및 비교 플랫폼입니다.

## ✨ 주요 기능

- 📝 보험 정보 게시글 관리 (CRUD)
- 💬 상담 신청 폼 (실시간 DB 저장)
- 🔍 보험료 비교 기능
- 👨‍💼 관리자 대시보드 (CMS)
- 🎨 반응형 디자인 (모바일 최적화)

## 🚀 빠른 시작 가이드

### 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com) 가입 및 로그인
2. 새 프로젝트 생성
3. SQL Editor에서 `supabase-schema.sql` 파일 실행
4. Settings > API에서 프로젝트 URL과 anon key 복사

### 2. 환경변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일 생성:

```bash
# .env.local 파일 생성
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**중요:** `.env.local` 파일에 실제 Supabase 값을 입력하세요!

### 3. 로컬 개발 서버 실행

```bash
# 의존성 설치 (이미 완료되었습니다)
npm install

# 개발 서버 시작
npm start
```

브라우저에서 `http://localhost:3000` 접속

### 4. 관리자 페이지 접속

`http://localhost:3000/admin` 접속하여 콘텐츠를 관리하세요.

## 📁 프로젝트 구조

```
insurepot-project/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.js         # 헤더 컴포넌트
│   │   ├── Hero.js           # 히어로 섹션
│   │   ├── QuickQuote.js     # 빠른 견적
│   │   ├── InfoSection.js    # 정보 섹션
│   │   ├── ComparisonSection.js # 비교 섹션
│   │   ├── ConsultationSection.js # 상담 신청
│   │   ├── Footer.js         # 푸터
│   │   ├── Admin.js          # 관리자 페이지
│   │   └── Admin.css         # 관리자 스타일
│   ├── App.js                # 메인 앱
│   ├── App.css               # 메인 스타일
│   ├── supabaseClient.js     # Supabase 클라이언트
│   └── index.js
├── supabase-schema.sql       # DB 스키마
├── .env.example              # 환경변수 예제
├── package.json
└── README.md
```

## 🛠 기술 스택

- **Frontend:** React 18
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (배포 준비 완료)
- **Styling:** CSS3 (Pretendard 폰트)

## 🌐 Vercel 배포하기

### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

### 방법 2: GitHub 연동 (추천)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. 환경변수 추가:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
6. Deploy 클릭!

## 📊 Supabase 데이터베이스 구조

### posts 테이블
- `id` (UUID) - 기본키
- `title` (TEXT) - 제목
- `category` (TEXT) - 카테고리
- `summary` (TEXT) - 요약
- `content` (TEXT) - 본문
- `view_count` (INTEGER) - 조회수
- `is_published` (BOOLEAN) - 발행 여부
- `created_at` (TIMESTAMP) - 생성일
- `updated_at` (TIMESTAMP) - 수정일

### consultations 테이블
- `id` (UUID) - 기본키
- `name` (TEXT) - 이름
- `phone` (TEXT) - 연락처
- `email` (TEXT) - 이메일
- `insurance_type` (TEXT) - 보험 종류
- `message` (TEXT) - 문의 내용
- `status` (TEXT) - 상태 (pending/in_progress/completed)
- `created_at` (TIMESTAMP) - 생성일

## 🎨 디자인 특징

- 보라색 그라데이션 히어로 섹션
- 카드 기반 레이아웃
- 부드러운 애니메이션
- 반응형 디자인 (모바일/태블릿/데스크톱)
- Pretendard 한글 폰트

## 📝 사용 방법

### 게시글 작성
1. `/admin` 접속
2. "콘텐츠 관리" 메뉴 선택
3. 제목, 카테고리, 내용 입력
4. "게시하기" 클릭

### 상담 문의 확인
1. `/admin` 접속
2. "상담 문의" 메뉴 선택
3. 문의 내용 확인 및 상태 변경

### 게시글 삭제
1. 콘텐츠 관리에서 삭제할 게시글 찾기
2. "삭제" 버튼 클릭

## 🔒 보안 설정

Supabase RLS(Row Level Security) 정책:
- **게시글:** 발행된 글만 공개 조회 가능
- **상담 문의:** 누구나 등록 가능, 조회는 제한

## 🐛 문제 해결

### Supabase 연결 오류
1. `.env.local` 파일이 있는지 확인
2. Supabase URL과 Key가 정확한지 확인
3. 개발 서버 재시작 (`npm start`)

### 게시글이 표시되지 않음
1. Supabase 대시보드에서 `posts` 테이블 확인
2. `is_published`가 `true`인지 확인
3. RLS 정책이 적용되었는지 확인

### 빌드 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📚 추가 개발 아이디어

- [ ] 회원 가입/로그인 기능
- [ ] 실제 보험사 API 연동
- [ ] 보험료 계산기 구현
- [ ] 이메일 알림 기능
- [ ] 검색 기능 추가
- [ ] 페이지네이션
- [ ] 이미지 업로드
- [ ] 댓글 기능

## 📞 지원

문제가 발생하면 이슈를 등록해주세요!

## 📄 라이선스

MIT License

---

**Made with ❤️ by Claude & Cursor**