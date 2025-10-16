# 🚀 Google Sheets 빠른 시작 (5분)

## ⚡ **초간단 설정**

### **1단계: Google Sheets 만들기** (1분)

1. https://sheets.google.com 접속
2. "새로 만들기" 클릭
3. 시트 이름: "카인포 차량 데이터"
4. 왼쪽 하단 시트 탭 이름: **"차량정보"** (중요!)

---

### **2단계: 헤더 & 샘플 데이터 복사** (1분)

아래 데이터를 **전체 선택 → 복사 → Google Sheets A1 셀에 붙여넣기**:

```
id	brand	model	trim	year	priceNew	priceRental	priceLease	fuelType	carType	displacement	fuelEfficiency	maxPower	maxTorque	transmission	length	width	height	wheelbase	seats	trunk	airbags	safetyRating	imageMain	pros	cons	published
car-001	현대	그랜저	캘리그라피	2025	48900000	635700	586800	가솔린	세단	3470	11.2	290	36.2	8단 자동	4995	1895	1490	2950	5	480	9	5	/images/cars/hyundai-grandeur.jpg	넓은 실내 공간|우수한 승차감|고급 디자인	높은 비용|낮은 연비	TRUE
car-002	기아	K8	시그니처	2025	46200000	600600	554400	가솔린	세단	3470	11.5	290	36.2	8단 자동	4995	1895	1465	2950	5	453	9	5	/images/cars/kia-k8.jpg	세련된 디자인|높은 가성비	좁은 뒷좌석	TRUE
```

---

### **3단계: 공개 설정** (1분)

1. 우측 상단 **"공유"** 클릭
2. "일반 액세스" 변경:
   - **"링크가 있는 모든 사용자"** 선택
   - 권한: **"뷰어"**
3. **Sheet ID 복사**:
   ```
   URL에서 /d/ 와 /edit 사이 부분
   ```

---

### **4단계: Google API 키 발급** (2분)

1. https://console.cloud.google.com/apis/credentials 접속
2. "+ 사용자 인증 정보 만들기" → "API 키"
3. API 키 복사
4. "키 제한" → "Google Sheets API"만 체크 → 저장

---

### **5단계: .env.local 파일 생성** (1분)

```
C:\Users\woosol\OneDrive\Desktop\car\.env.local
```

파일 생성 후:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

REACT_APP_GOOGLE_SHEET_ID=복사한_Sheet_ID
REACT_APP_GOOGLE_API_KEY=복사한_API_키
```

---

### **6단계: 서버 재시작**

터미널:

```bash
Ctrl+C (서버 중지)
npm start (재시작)
```

---

## ✅ **확인**

브라우저에서:

- 상단에 **"📊 Google Sheets 연동됨"** 배지 확인
- 차량 2대 표시 확인 (그랜저, K8)

---

## 🎉 **완료!**

이제 Google Sheets만 수정하면 바로 반영됩니다!

**테스트:**

1. Sheets에서 "그랜저" 가격 변경
2. 웹사이트에서 🔄 새로고침 버튼 클릭
3. 가격 변경 확인!

---

## 📝 **다음 작업**

1. **차량 추가**: 3행부터 차량 추가
2. **published 관리**: 체크/해제로 표시 제어
3. **이미지 추가**: public/images/cars/ 폴더

---

**문제 발생 시**: `GOOGLE-SHEETS-SETUP.md` 참고
