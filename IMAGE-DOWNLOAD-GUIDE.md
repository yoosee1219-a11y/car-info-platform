# 🖼️ 차량 이미지 다운로드 가이드

실제 차량 이미지를 추가하여 프로젝트를 완성하세요!

---

## 📂 **저장 위치**

```
C:\Users\woosol\OneDrive\Desktop\car\public\images\cars\
```

---

## 📋 **다운로드 리스트**

아래 10개 차량의 이미지를 다운로드하세요:

### 필수 파일 (10개)

```
✅ hyundai-grandeur.jpg       (현대 그랜저)
✅ kia-k8.jpg                 (기아 K8)
✅ genesis-g80.jpg            (제네시스 G80)
✅ hyundai-palisade.jpg       (현대 팰리세이드)
✅ kia-sorento.jpg            (기아 쏘렌토)
✅ hyundai-ioniq5.jpg         (현대 아이오닉5)
✅ kia-ev6.jpg                (기아 EV6)
✅ mercedes-eclass.jpg        (벤츠 E클래스)
✅ bmw-5series.jpg            (BMW 5시리즈)
✅ tesla-model3.jpg           (테슬라 모델3)
```

### 선택 파일 (추가 각도)

```
hyundai-grandeur-side.jpg
hyundai-grandeur-interior.jpg
hyundai-grandeur-trunk.jpg
kia-k8-side.jpg
genesis-g80-side.jpg
```

---

## 🌐 **이미지 소스**

### **1. 현대자동차**

**URL**: https://www.hyundai.com/kr/ko

**다운로드 방법:**

1. 위 사이트 접속
2. 상단 메뉴: "차량" 클릭
3. 원하는 차량 선택 (그랜저, 팰리세이드, 아이오닉5)
4. 메인 이미지에서 **우클릭** → "다른 이름으로 이미지 저장"
5. 파일명을 규칙에 맞게 변경
   - 예: `hyundai-grandeur.jpg`
6. `C:\Users\woosol\OneDrive\Desktop\car\public\images\cars\` 폴더에 저장

**차량 목록:**

- 그랜저 → `hyundai-grandeur.jpg`
- 팰리세이드 → `hyundai-palisade.jpg`
- 아이오닉5 → `hyundai-ioniq5.jpg`

---

### **2. 기아자동차**

**URL**: https://www.kia.com/kr

**차량 목록:**

- K8 → `kia-k8.jpg`
- 쏘렌토 → `kia-sorento.jpg`
- EV6 → `kia-ev6.jpg`

**다운로드 절차:**

1. 사이트 접속 → "차량" → 해당 차량
2. 메인 이미지 우클릭 → 저장
3. 파일명 변경 후 `public/images/cars/` 폴더에 저장

---

### **3. 제네시스**

**URL**: https://www.genesis.com/kr/ko

**차량:**

- G80 → `genesis-g80.jpg`

---

### **4. 수입차 (벤츠, BMW, 테슬라)**

#### **벤츠**

**URL**: https://www.mercedes-benz.co.kr

- E-Class → `mercedes-eclass.jpg`

#### **BMW**

**URL**: https://www.bmw.co.kr

- 5시리즈 → `bmw-5series.jpg`

#### **테슬라**

**URL**: https://www.tesla.com/ko_kr

- Model 3 → `tesla-model3.jpg`

---

## 📐 **이미지 사양 권장**

| 항목     | 권장값       | 설명                        |
| -------- | ------------ | --------------------------- |
| **크기** | 800x500px    | 16:10 비율                  |
| **포맷** | JPG 또는 PNG | JPG 권장                    |
| **용량** | 200KB 이하   | 최적화 필요 시 TinyPNG 사용 |
| **품질** | 고품질       | 선명한 이미지               |

---

## 🔧 **이미지 최적화 (선택)**

다운로드한 이미지가 너무 크다면:

### **온라인 도구:**

1. **TinyPNG**: https://tinypng.com
   - 드래그 앤 드롭 → 자동 압축 → 다운로드
2. **Squoosh**: https://squoosh.app
   - Google 제공, 세밀한 조정 가능

### **일괄 최적화 (고급):**

```bash
npm install -g sharp-cli
sharp -i "public/images/cars/*.jpg" -o "optimized/" --width 800 --height 500
```

---

## 🎯 **빠른 시작 (5분 완성)**

### Step 1: 폴더 열기

```
탐색기에서 다음 경로 열기:
C:\Users\woosol\OneDrive\Desktop\car\public\images\cars\
```

### Step 2: 이미지 다운로드

필수 10개 차량 이미지만 우선 다운로드:

- 현대 그랜저
- 기아 K8
- 제네시스 G80
- 현대 팰리세이드
- 기아 쏘렌토
- 현대 아이오닉5
- 기아 EV6
- 벤츠 E클래스
- BMW 5시리즈
- 테슬라 모델3

### Step 3: 파일명 변경

다운로드한 이미지를 규칙에 맞게 이름 변경

### Step 4: 확인

브라우저 새로고침 → 실제 이미지 확인!

---

## ⚡ **현재 상태**

- ✅ 폴더 생성됨: `public/images/cars/`
- ✅ 이미지 경로 설정 완료
- ✅ Fallback 이미지 처리 완료
  - 이미지가 없으면 자동으로 placeholder 표시
  - 이미지 추가 시 자동 반영

---

## 💡 **Tip**

**이미지가 없어도 괜찮습니다!**

- 현재는 placeholder 이미지가 표시됩니다
- 나중에 이미지를 추가하면 자동으로 반영됩니다
- 개발하면서 천천히 추가하세요!

---

## 📝 **체크리스트**

```
폴더 확인:
□ C:\Users\woosol\OneDrive\Desktop\car\public\images\cars\ 폴더 존재

이미지 다운로드:
□ hyundai-grandeur.jpg
□ kia-k8.jpg
□ genesis-g80.jpg
□ hyundai-palisade.jpg
□ kia-sorento.jpg
□ hyundai-ioniq5.jpg
□ kia-ev6.jpg
□ mercedes-eclass.jpg
□ bmw-5series.jpg
□ tesla-model3.jpg

확인:
□ 브라우저 새로고침 (Ctrl + F5)
□ 이미지 정상 표시
```

---

**현재 브라우저에서 확인하세요!** http://localhost:3000

이미지가 없으면 보라색 placeholder가 표시되고, 이미지를 추가하면 자동으로 실제 이미지가 표시됩니다! 🎉
