# 🔧 환경변수 설정 가이드

## 📝 **.env.local 파일 생성**

프로젝트 루트에 `.env.local` 파일을 만들고 아래 내용을 복사하세요:

### **위치:**

```
C:\Users\woosol\OneDrive\Desktop\car\.env.local
```

### **내용:**

```env
# =================================
# Supabase 설정 (필수)
# =================================
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# =================================
# Google Sheets API 설정 (선택)
# 차량 데이터를 Google Sheets로 관리하려면 설정하세요
# =================================
REACT_APP_GOOGLE_SHEET_ID=your_google_sheet_id
REACT_APP_GOOGLE_API_KEY=your_google_api_key
```

---

## 🔑 **값 입력 방법**

### **1. Supabase 설정 (기존)**

이미 설정되어 있다면 그대로 유지하세요.

### **2. Google Sheets 설정 (새로 추가)**

#### **REACT_APP_GOOGLE_SHEET_ID:**

Google Sheets URL에서 ID 복사:

```
https://docs.google.com/spreadsheets/d/[이_부분_복사]/edit
                                        ↓
예: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

#### **REACT_APP_GOOGLE_API_KEY:**

Google Cloud Console에서 생성한 API 키:

```
예: AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

---

## ✅ **완성 예시**

```env
# Supabase
REACT_APP_SUPABASE_URL=https://abc123xyz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Sheets
REACT_APP_GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
REACT_APP_GOOGLE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
```

---

## ⚠️ **주의사항**

1. **파일명 정확히**: `.env.local` (점 포함!)
2. **따옴표 없음**: 값에 `""` 붙이지 마세요
3. **공백 없음**: `=` 앞뒤 공백 제거
4. **재시작 필수**: 환경변수 변경 시 `npm start` 재시작

---

## 🔒 **보안**

- ✅ `.env.local`은 자동으로 `.gitignore`에 포함됨
- ✅ GitHub에 절대 업로드되지 않음
- ⚠️ 절대 다른 사람과 공유하지 마세요!

---

## 🚀 **서버 재시작**

환경변수 설정 후:

```bash
# 터미널에서 Ctrl+C
# 그 다음:
npm start
```

---

완료!
