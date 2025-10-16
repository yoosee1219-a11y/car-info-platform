# 📊 Google Sheets 연동 가이드

Google Sheets를 사용하여 차량 데이터를 쉽게 관리하세요!

---

## 🎯 **장점**

- ✅ **엑셀처럼 편한 인터페이스** (복사/붙여넣기 자유)
- ✅ **실시간 반영** (Sheets 수정 → 웹사이트 새로고침)
- ✅ **체크박스 발행 관리** (체크된 차량만 표시)
- ✅ **수식 사용 가능** (렌터카 가격 자동 계산)
- ✅ **어디서나 수정** (모바일/태블릿 OK)
- ✅ **협업 가능** (여러 명이 함께 편집)

---

## 🚀 **빠른 시작 (30분)**

### **Step 1: Google Sheets 템플릿 복사**

1. 아래 링크로 접속:

   ```
   https://docs.google.com/spreadsheets/d/YOUR_TEMPLATE_ID/copy
   ```

2. "사본 만들기" 클릭

3. 시트 이름: "카인포 차량 데이터"

---

### **Step 2: Google Cloud Console 설정**

#### 2-1. 프로젝트 생성

1. https://console.cloud.google.com 접속
2. "새 프로젝트" 클릭
3. 프로젝트 이름: "카인포" 입력
4. "만들기" 클릭

#### 2-2. Google Sheets API 활성화

1. 왼쪽 메뉴 → "API 및 서비스" → "라이브러리"
2. 검색: "Google Sheets API"
3. "Google Sheets API" 클릭
4. "사용 설정" 클릭

#### 2-3. API 키 생성

1. 왼쪽 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. 상단 "+ 사용자 인증 정보 만들기" 클릭
3. "API 키" 선택
4. **API 키 복사** (예: `AIzaSyD...`)
5. "키 제한" 클릭:
   - "API 제한사항" 선택
   - "Google Sheets API"만 체크
   - "저장"

---

### **Step 3: Google Sheets 설정**

#### 3-1. Sheet ID 확인

Google Sheets 주소에서 ID 복사:

```
https://docs.google.com/spreadsheets/d/[이 부분이 SHEET_ID]/edit
                                        ↑
                                   여기를 복사!
```

예시:

```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit

Sheet ID: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

#### 3-2. 공개 설정

1. 우측 상단 "공유" 클릭
2. "일반 액세스" 섹션:
   - "제한됨" → **"링크가 있는 모든 사용자"** 변경
   - 권한: **"뷰어"** (보기만 가능)
3. "완료" 클릭

⚠️ **중요**: 뷰어 권한만 부여하세요. 편집 권한은 X!

---

### **Step 4: 프로젝트 환경변수 설정**

#### 4-1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일 생성:

```bash
C:\Users\woosol\OneDrive\Desktop\car\.env.local
```

#### 4-2. 내용 작성

```env
# Supabase (기존 설정 유지)
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

# Google Sheets (새로 추가)
REACT_APP_GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
REACT_APP_GOOGLE_API_KEY=AIzaSyD...your_api_key
```

**실제 값으로 교체:**

- `REACT_APP_GOOGLE_SHEET_ID`: Step 3-1에서 복사한 Sheet ID
- `REACT_APP_GOOGLE_API_KEY`: Step 2-3에서 복사한 API 키

---

### **Step 5: 개발 서버 재시작**

```bash
# 터미널에서 Ctrl+C로 서버 중지 후 재시작
npm start
```

⚠️ **환경변수 변경 시 반드시 서버 재시작 필요!**

---

## 📋 **Google Sheets 템플릿 구조**

### **컬럼 레이아웃 (A~Z열)**

| 열     | 필드명         | 타입         | 예시                              | 필수   |
| ------ | -------------- | ------------ | --------------------------------- | ------ |
| A      | id             | 텍스트       | car-001                           | ✅     |
| B      | brand          | 텍스트       | 현대                              | ✅     |
| C      | model          | 텍스트       | 그랜저                            | ✅     |
| D      | trim           | 텍스트       | 캘리그라피                        |        |
| E      | year           | 숫자         | 2025                              | ✅     |
| F      | priceNew       | 숫자         | 48900000                          | ✅     |
| G      | priceRental    | 수식         | `=F2*0.013`                       |        |
| H      | priceLease     | 수식         | `=F2*0.012`                       |        |
| I      | fuelType       | 텍스트       | 가솔린                            | ✅     |
| J      | carType        | 텍스트       | 세단                              | ✅     |
| K      | displacement   | 숫자         | 3470                              | ✅     |
| L      | fuelEfficiency | 숫자         | 11.2                              | ✅     |
| M      | maxPower       | 숫자         | 290                               | ✅     |
| N      | maxTorque      | 숫자         | 36.2                              | ✅     |
| O      | transmission   | 텍스트       | 8단 자동                          | ✅     |
| P      | length         | 숫자         | 4995                              | ✅     |
| Q      | width          | 숫자         | 1895                              | ✅     |
| R      | height         | 숫자         | 1490                              | ✅     |
| S      | wheelbase      | 숫자         | 2950                              |        |
| T      | seats          | 숫자         | 5                                 | ✅     |
| U      | trunk          | 숫자         | 480                               |        |
| V      | airbags        | 숫자         | 9                                 |        |
| W      | safetyRating   | 숫자         | 5                                 |        |
| X      | imageMain      | 텍스트       | /images/cars/hyundai-grandeur.jpg |        |
| Y      | pros           | 텍스트       | 넓은 공간\|우수한 승차감          |        |
| Z      | cons           | 텍스트       | 높은 비용\|낮은 연비              |        |
| **AA** | **published**  | **체크박스** | **TRUE**                          | **✅** |

---

## 📝 **1행 (헤더) 설정**

Google Sheets 1행에 다음과 같이 입력:

```
A1: id
B1: brand
C1: model
D1: trim
E1: year
F1: priceNew
G1: priceRental
H1: priceLease
I1: fuelType
J1: carType
K1: displacement
L1: fuelEfficiency
M1: maxPower
N1: maxTorque
O1: transmission
P1: length
Q1: width
R1: height
S1: wheelbase
T1: seats
U1: trunk
V1: airbags
W1: safetyRating
X1: imageMain
Y1: pros
Z1: cons
AA1: published
```

---

## 🎨 **2행 샘플 데이터**

```
A2: car-001
B2: 현대
C2: 그랜저
D2: 캘리그라피
E2: 2025
F2: 48900000
G2: =F2*0.013
H2: =F2*0.012
I2: 가솔린
J2: 세단
K2: 3470
L2: 11.2
M2: 290
N2: 36.2
O2: 8단 자동
P2: 4995
Q2: 1895
R2: 1490
S2: 2950
T2: 5
U2: 480
V2: 9
W2: 5
X2: /images/cars/hyundai-grandeur.jpg
Y2: 넓은 실내 공간|우수한 승차감|고급스러운 디자인
Z2: 높은 초기 비용|낮은 연비
AA2: ☑ (체크박스)
```

---

## ✅ **체크박스 설정**

### **AA열 (published)에 체크박스 추가:**

1. AA2 셀 선택
2. 상단 메뉴: "삽입" → "체크박스" 클릭
3. 체크박스 생성됨 ☑
4. 아래로 드래그하여 복사

**사용법:**

- ☑ 체크: 웹사이트에 표시
- ☐ 해제: 숨김 (작성중, 품절 등)

---

## 🔧 **수식 활용**

### **G열: 렌터카 월납입금 (자동 계산)**

```excel
=F2*0.013
```

→ 신차가의 1.3%로 자동 계산

### **H열: 리스 월납입금 (자동 계산)**

```excel
=F2*0.012
```

→ 신차가의 1.2%로 자동 계산

### **X열: 이미지 경로 (자동 생성)**

```excel
="/images/cars/"&LOWER(B2)&"-"&LOWER(C2)&".jpg"
```

→ `/images/cars/hyundai-grandeur.jpg` 자동 생성

---

## 🎯 **데이터 입력 워크플로우**

### **신규 차량 추가:**

```
1. Google Sheets 열기
2. 마지막 행에 새 줄 추가
3. 필수 항목 입력:
   - id: car-011
   - brand: 현대
   - model: 쏘나타
   - priceNew: 35000000
   - displacement: 1999
   - fuelEfficiency: 13.5
   - ... (나머지)
4. published 체크 (☑)
5. 웹사이트 새로고침 (F5)
6. 확인!
```

### **차량 숨기기:**

```
1. 해당 행의 published 체크 해제 (☐)
2. 웹사이트 새로고침
3. 사라짐!
```

### **대량 입력:**

```
1. 네이버 자동차에서 데이터 복사
2. Google Sheets에 붙여넣기
3. 수식으로 가격 자동 계산
4. published 모두 해제
5. 검수하면서 하나씩 체크
6. 체크된 것만 웹사이트 표시
```

---

## 🐛 **문제 해결**

### **Q1: 데이터가 표시되지 않아요**

**확인 사항:**

```
□ .env.local 파일에 SHEET_ID, API_KEY 입력했나요?
□ Google Sheets가 "링크가 있는 모든 사용자" 공개인가요?
□ Sheets API가 활성화되어 있나요?
□ 개발 서버를 재시작했나요? (npm start)
□ published 체크박스가 체크되어 있나요?
```

### **Q2: API 오류 (403 Forbidden)**

**해결:**

1. Google Cloud Console → API 키 확인
2. "API 제한사항"에서 "Google Sheets API" 체크 확인
3. Sheets 공개 설정 확인

### **Q3: 샘플 데이터가 계속 표시돼요**

**원인:**

- 환경변수 미설정
- Sheets 데이터 없음
- published 체크 안됨

**확인:**

- 콘솔 로그 확인 (F12 → Console)
- "Google Sheets 연동됨" 배지 확인

---

## 📊 **Google Sheets 템플릿 다운로드**

### **방법 1: 직접 만들기**

1. Google Sheets 새로 만들기
2. 시트 이름: "차량정보"
3. 1행에 헤더 입력 (A1~AA1)
4. 2행부터 데이터 입력

### **방법 2: 템플릿 복사 (권장)**

아래 샘플 데이터를 복사해서 사용하세요:

```
id	brand	model	trim	year	priceNew	priceRental	priceLease	fuelType	carType	displacement	fuelEfficiency	maxPower	maxTorque	transmission	length	width	height	wheelbase	seats	trunk	airbags	safetyRating	imageMain	pros	cons	published
car-001	현대	그랜저	캘리그라피	2025	48900000	=F2*0.013	=F2*0.012	가솔린	세단	3470	11.2	290	36.2	8단 자동	4995	1895	1490	2950	5	480	9	5	/images/cars/hyundai-grandeur.jpg	넓은 실내 공간|우수한 승차감|고급스러운 디자인	높은 초기 비용|낮은 연비	TRUE
car-002	기아	K8	시그니처	2025	46200000	=F3*0.013	=F3*0.012	가솔린	세단	3470	11.5	290	36.2	8단 자동	4995	1895	1465	2950	5	453	9	5	/images/cars/kia-k8.jpg	세련된 디자인|높은 가성비	좁은 뒷좌석	TRUE
```

---

## 💡 **사용 팁**

### **Tip 1: 조건부 서식**

published 체크된 행만 강조:

1. 전체 데이터 선택
2. 서식 → 조건부 서식
3. 조건: `=$AA2=TRUE`
4. 배경색: 연한 초록색

### **Tip 2: 데이터 검증**

fuelType에 드롭다운:

1. I열 선택
2. 데이터 → 데이터 검증
3. 목록: `가솔린,디젤,하이브리드,전기`

### **Tip 3: 자동 ID 생성**

A열 수식:

```excel
="car-"&TEXT(ROW()-1,"000")
```

→ car-001, car-002, car-003 자동 생성

---

## 🔄 **업데이트 방법**

### **데이터 수정 시:**

```
1. Google Sheets에서 수정
2. 저장 (자동 저장됨)
3. 웹사이트로 돌아가기
4. 🔄 새로고침 버튼 클릭
   또는 F5 새로고침
5. 변경사항 즉시 반영!
```

---

## 📱 **모바일에서 수정**

```
1. Google Sheets 앱 실행
2. "카인포 차량 데이터" 열기
3. 데이터 수정
4. 자동 저장
5. 웹사이트 새로고침
```

---

## 🎉 **완료 체크리스트**

```
설정:
□ Google Cloud Console 프로젝트 생성
□ Google Sheets API 활성화
□ API 키 생성 및 복사
□ Google Sheets 생성
□ Sheet ID 복사
□ Sheets 공개 설정 (링크가 있는 모든 사용자)
□ .env.local 파일 생성
□ SHEET_ID, API_KEY 입력
□ 개발 서버 재시작

데이터:
□ 1행 헤더 입력
□ 2행부터 차량 데이터 입력
□ AA열 체크박스 추가
□ 수식 설정 (G, H열)
□ published 체크

확인:
□ 웹사이트에 "📊 Google Sheets 연동됨" 표시
□ 차량 데이터 정상 표시
□ Sheets 수정 → 새로고침 → 반영 확인
```

---

## 🔒 **보안 주의사항**

### **API 키 노출 방지:**

```
❌ 절대 안 됨:
- GitHub에 .env.local 업로드
- API 키 공개 공유

✅ 안전:
- .env.local은 .gitignore에 포함됨
- API 키는 "API 제한사항" 설정
- Sheets는 "뷰어" 권한만
```

---

## 🎯 **다음 단계**

설정 완료 후:

1. **차량 데이터 입력** (10개)
2. **이미지 추가** (public/images/cars/)
3. **published 체크**
4. **웹사이트 확인**
5. **실시간 수정 테스트**

---

**준비되셨나요?**

설정하시면서 막히는 부분이 있으면 언제든 물어보세요! 🚀
