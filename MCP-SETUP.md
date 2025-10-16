### MCP 연결 빠른 시작 (Supabase → Vercel → Cloudflare)

이 문서는 Cursor에서 MCP 서버를 연결하기 위한 프로젝트 내 가이드입니다. 제가 제공한 스크립트와 설정 예시를 순서대로 적용하면, 최소 작업으로 MCP를 등록할 수 있습니다.

---

### 0) 사전 준비

- Node.js 18+ 또는 Python 3.10+
- 각 서비스 API 키: Supabase URL/Anon Key, Vercel Token, Cloudflare API Token(+Account ID)

---

### 1) 환경 변수 등록 (Windows PowerShell)

1. PowerShell을 관리자 권한으로 실행
2. 아래 스크립트를 실행한 뒤, 안내에 따라 값을 입력

```powershell
./scripts/set-mcp-env.ps1
```

등록되는 변수:

- SUPABASE_URL, SUPABASE_ANON_KEY
- VERCEL_TOKEN
- CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (선택)

확인 방법(새 PowerShell 세션에서):

```powershell
echo $env:SUPABASE_URL
```

---

### 2) MCP 설정 예시 확인

`mcp/mcp.config.example.json` 에 Supabase/Vercel/Cloudflare 서버 정의 예시가 있습니다. Cursor Settings → MCP → Add Server에서 해당 커맨드와 환경변수를 등록하세요.

예시 항목:

- supabase: command = "mcp-supabase"
- vercel: command = "mcp-vercel"
- cloudflare: command = "mcp-cloudflare"

참고: 실제 커맨드 이름은 사용하는 MCP 서버 패키지에 따라 달라질 수 있습니다.

---

### 3) 연결 검증

- Supabase
  - `scripts/test-supabase.ps1` 실행 → URL/키 형식·접속 검증
- Vercel
  - `scripts/test-vercel.ps1` 실행 → 토큰 유효성 및 프로젝트/배포 조회 API 호출 샘플
- Cloudflare
  - `scripts/test-cloudflare.ps1` 실행 → 계정 조회/존 목록 호출 샘플

PowerShell에서 실행:

```powershell
./scripts/test-supabase.ps1
./scripts/test-vercel.ps1
./scripts/test-cloudflare.ps1
```

각 스크립트는 실패 시 2~3회 내 재시도 후 종료하고, 오류 메시지를 출력합니다.

---

### 4) 권한/보안 권고

- 키는 소스에 커밋하지 말 것(.gitignore 유지)
- 최소 권한 토큰 사용(읽기/쓰기 분리 권장)
- 운영/개발 키 분리

---

### 5) 문제 해결

- 환경변수가 새 세션에서만 보이면, PowerShell 재시작
- 프록시/방화벽 환경에서는 `Invoke-WebRequest`가 차단될 수 있으니 네트워크 허용 필요
- MCP 서버 커맨드가 인식되지 않으면 글로벌 설치 또는 PATH 확인

---

### 6) 다음 단계

1. Supabase MCP 등록 → 댓글/리드 테이블 read-only 확인
2. Vercel MCP 등록 → 프리뷰/로그 조회 권한 확인
3. Cloudflare MCP 등록 → 캐시 퍼지/존 조회 권한 확인


