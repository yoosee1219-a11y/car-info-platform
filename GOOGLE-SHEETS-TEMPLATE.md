# 📊 Google Sheets 템플릿

차량 데이터를 관리할 Google Sheets 템플릿입니다.

---

## 🎯 **시트 구조**

### **시트 이름: "차량정보"**

---

## 📋 **컬럼 헤더 (1행)**

아래 헤더를 Google Sheets 1행에 복사하세요:

```
id	brand	model	trim	year	priceNew	priceRental	priceLease	fuelType	carType	displacement	fuelEfficiency	maxPower	maxTorque	transmission	length	width	height	wheelbase	seats	trunk	airbags	safetyRating	imageMain	pros	cons	published
```

**또는 하나씩:**

| 열  | 헤더명         | 설명                               |
| --- | -------------- | ---------------------------------- |
| A   | id             | 차량 ID (car-001)                  |
| B   | brand          | 브랜드 (현대, 기아...)             |
| C   | model          | 모델명 (그랜저, K8...)             |
| D   | trim           | 트림 (캘리그라피...)               |
| E   | year           | 연식 (2025)                        |
| F   | priceNew       | 신차 가격 (48900000)               |
| G   | priceRental    | 렌터카 월납입금                    |
| H   | priceLease     | 리스 월납입금                      |
| I   | fuelType       | 연료 (가솔린/디젤/하이브리드/전기) |
| J   | carType        | 차종 (세단/SUV...)                 |
| K   | displacement   | 배기량 (3470)                      |
| L   | fuelEfficiency | 복합연비 (11.2)                    |
| M   | maxPower       | 최대출력 (290)                     |
| N   | maxTorque      | 최대토크 (36.2)                    |
| O   | transmission   | 변속기 (8단 자동)                  |
| P   | length         | 전장 (4995)                        |
| Q   | width          | 전폭 (1895)                        |
| R   | height         | 전고 (1490)                        |
| S   | wheelbase      | 축거 (2950)                        |
| T   | seats          | 승차인원 (5)                       |
| U   | trunk          | 트렁크 (480)                       |
| V   | airbags        | 에어백 (9)                         |
| W   | safetyRating   | 안전등급 (5)                       |
| X   | imageMain      | 이미지 경로                        |
| Y   | pros           | 장점 (구분자: \|)                  |
| Z   | cons           | 단점 (구분자: \|)                  |
| AA  | published      | 발행 여부 (체크박스)               |

---

## 📝 **샘플 데이터 (2~3행)**

### **2행: 현대 그랜저**

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
Y2: 넓은 실내 공간|우수한 승차감|고급스러운 디자인|풍부한 안전 사양
Z2: 높은 초기 비용|낮은 연비|큰 회전 반경
AA2: TRUE (체크박스)
```

### **3행: 기아 K8**

```
A3: car-002
B3: 기아
C3: K8
D3: 시그니처
E3: 2025
F3: 46200000
G3: =F3*0.013
H3: =F3*0.012
I3: 가솔린
J3: 세단
K3: 3470
L3: 11.5
M3: 290
N3: 36.2
O3: 8단 자동
P3: 4995
Q3: 1895
R3: 1465
S3: 2950
T3: 5
U3: 453
V3: 9
W3: 5
X3: /images/cars/kia-k8.jpg
Y3: 세련된 디자인|높은 가성비|우수한 주행 성능
Z3: 좁은 뒷좌석|낮은 브랜드 인지도
AA3: TRUE (체크박스)
```

---

## 🎨 **체크박스 추가 방법**

### **AA열 전체를 체크박스로:**

1. AA2 셀 클릭
2. 상단 메뉴: **"삽입"** → **"체크박스"**
3. 체크박스 생성됨 ☑
4. AA2 셀 선택 후 **아래로 드래그** (AA100까지)
5. 모든 행에 체크박스 복사됨

---

## 🔢 **수식 설정**

### **G2: 렌터카 월납입금 (신차가의 1.3%)**

```excel
=F2*0.013
```

아래로 복사 (G3, G4, G5...)

### **H2: 리스 월납입금 (신차가의 1.2%)**

```excel
=F2*0.012
```

아래로 복사

---

## 📸 **이미지 경로 규칙**

### **수동 입력:**

```
/images/cars/[브랜드]-[모델].jpg

예:
/images/cars/hyundai-grandeur.jpg
/images/cars/kia-k8.jpg
/images/cars/genesis-g80.jpg
```

### **자동 생성 (수식):**

```excel
="/images/cars/"&LOWER(B2)&"-"&LOWER(C2)&".jpg"
```

→ `/images/cars/hyundai-grandeur.jpg` 자동 생성

---

## 🎯 **필수 필드**

최소한 이것만 입력하면 됩니다:

```
✅ id (A)
✅ brand (B)
✅ model (C)
✅ year (E)
✅ priceNew (F)
✅ fuelType (I)
✅ carType (J)
✅ published (AA) - TRUE로 체크!
```

나머지는 선택사항입니다.

---

## 📦 **빠른 복사용 TSV 데이터**

아래 데이터를 복사해서 Google Sheets A1 셀에 붙여넣으세요:

```tsv
id	brand	model	trim	year	priceNew	priceRental	priceLease	fuelType	carType	displacement	fuelEfficiency	maxPower	maxTorque	transmission	length	width	height	wheelbase	seats	trunk	airbags	safetyRating	imageMain	pros	cons	published
car-001	현대	그랜저	캘리그라피	2025	48900000	635700	586800	가솔린	세단	3470	11.2	290	36.2	8단 자동	4995	1895	1490	2950	5	480	9	5	/images/cars/hyundai-grandeur.jpg	넓은 실내 공간|우수한 승차감|고급스러운 디자인	높은 초기 비용|낮은 연비	TRUE
car-002	기아	K8	시그니처	2025	46200000	600600	554400	가솔린	세단	3470	11.5	290	36.2	8단 자동	4995	1895	1465	2950	5	453	9	5	/images/cars/kia-k8.jpg	세련된 디자인|높은 가성비	좁은 뒷좌석	FALSE
```

**붙여넣기 후:**

- G2, H2의 수식을 `=F2*0.013`, `=F2*0.012`로 변경
- AA열을 체크박스로 변경

---

## 🎉 **완성!**

데이터 입력 후:

1. 웹사이트 새로고침 (F5)
2. "📊 Google Sheets 연동됨" 배지 확인
3. 차량 카드 표시 확인!

---

**Tip**: published=TRUE인 차량만 표시됩니다!
