/**
 * Google Sheets API 서비스
 * Google Sheets에서 차량 데이터를 가져와서 React에서 사용할 수 있는 형태로 변환
 * 캐싱 시스템으로 API 호출 최소화
 */

// 캐시 키
const CACHE_KEY = "carInfo_googleSheets_cache";
const CACHE_EXPIRY_KEY = "carInfo_googleSheets_cache_expiry";
const CACHE_DURATION = 30 * 60 * 1000; // 30분

/**
 * 로컬 캐시에서 차량 데이터 가져오기
 * @returns {Array|null} 캐시된 차량 데이터 또는 null
 */
function getCachedCars() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);

    if (!cached || !expiry) return null;

    const now = Date.now();
    if (now > parseInt(expiry)) {
      // 캐시 만료됨
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);
      return null;
    }

    console.log("📦 캐시된 차량 데이터 사용 중");
    return JSON.parse(cached);
  } catch (error) {
    console.error("캐시 읽기 실패:", error);
    return null;
  }
}

/**
 * 차량 데이터를 로컬 캐시에 저장
 * @param {Array} cars - 차량 데이터 배열
 */
function setCachedCars(cars) {
  try {
    const expiry = Date.now() + CACHE_DURATION;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cars));
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString());
    console.log("💾 차량 데이터 캐시 저장 완료 (30분 유효)");
  } catch (error) {
    console.error("캐시 저장 실패:", error);
  }
}

/**
 * Google Sheets에서 차량 데이터 가져오기 (캐싱 적용)
 * @param {boolean} forceRefresh - 강제 새로고침 여부
 * @returns {Promise<Array>} 차량 데이터 배열
 */
export async function fetchCarsFromGoogleSheets(forceRefresh = false) {
  // 강제 새로고침이 아니면 캐시 확인
  if (!forceRefresh) {
    const cached = getCachedCars();
    if (cached) {
      return cached;
    }
  }
  try {
    const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

    if (!SHEET_ID || !API_KEY) {
      console.warn("Google Sheets 설정이 없습니다. 샘플 데이터를 사용합니다.");
      return null;
    }

    // Google Sheets API v4 엔드포인트
    // 범위: A1:AA11 (헤더 포함, 10개 차량 데이터)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/차량정보!A1:AA11?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API 오류: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      console.warn("Google Sheets에 데이터가 없습니다.");
      return [];
    }

    // 데이터 변환 (첫 번째 행은 헤더이므로 제외)
    const cars = data.values
      .slice(1) // 헤더 행 제외
      .filter((row) => {
        // AA열(인덱스 26): published 드롭다운
        // TRUE인 것만 가져오기
        const isPublished = row[26];
        return (
          isPublished === "TRUE" ||
          isPublished === true ||
          isPublished === "true"
        );
      })
      .map((row, index) => transformRowToCar(row, index));

    console.log(
      `✅ Google Sheets에서 ${cars.length}개 차량 데이터를 불러왔습니다.`
    );

    // 캐시에 저장
    setCachedCars(cars);

    return cars;
  } catch (error) {
    console.error("Google Sheets 데이터 로드 실패:", error);
    return null;
  }
}

/**
 * Sheets 행 데이터를 차량 객체로 변환
 * @param {Array} row - Sheets의 한 행 (배열)
 * @param {number} index - 행 번호
 * @returns {Object} 차량 객체
 */
function transformRowToCar(row, index) {
  // 필드 인덱스 매핑
  const [
    id, // A: id
    brand, // B: brand
    model, // C: model
    trim, // D: trim
    year, // E: year
    priceNew, // F: priceNew
    priceRental, // G: priceRentalMonthly
    priceLease, // H: priceLeaseMonthly
    fuelType, // I: fuelType
    carType, // J: carType
    displacement, // K: displacement
    fuelEfficiency, // L: fuelEfficiency
    maxPower, // M: maxPower
    maxTorque, // N: maxTorque
    transmission, // O: transmission
    length, // P: length
    width, // Q: width
    height, // R: height
    wheelbase, // S: wheelbase
    seats, // T: seats
    trunk, // U: trunk
    airbags, // V: airbags
    safetyRating, // W: safetyRating
    imageMain, // X: imageMain
    pros, // Y: pros (구분자: |)
    cons, // Z: cons (구분자: |)
    // 추가로 필요하면 더 확장 가능
  ] = row;

  // slug 자동 생성
  const slug =
    `${brand?.toLowerCase()}-${model?.toLowerCase()}-${year}`.replace(
      /\s+/g,
      "-"
    );

  return {
    id: id || `car-${String(index + 1).padStart(3, "0")}`,
    brand: brand || "",
    model: model || "",
    trim: trim || "",
    year: parseInt(year) || new Date().getFullYear(),
    slug,

    // 가격
    priceNew: parseInt(priceNew) || 0,
    priceRentalMonthly: parseInt(priceRental) || 0,
    priceLeaseMonthly: parseInt(priceLease) || 0,

    // 기본 정보
    fuelType: fuelType || "가솔린",
    carType: carType || "세단",
    displacement: parseInt(displacement) || 0,
    fuelEfficiency: parseFloat(fuelEfficiency) || 0,

    // 재원 정보
    specs: {
      engine: {
        maxPower: parseInt(maxPower) || 0,
        maxTorque: parseFloat(maxTorque) || 0,
        transmission: transmission || "자동",
      },
      dimension: {
        length: parseInt(length) || 0,
        width: parseInt(width) || 0,
        height: parseInt(height) || 0,
        wheelbase: parseInt(wheelbase) || 0,
      },
      capacity: {
        seats: parseInt(seats) || 5,
        trunk: parseInt(trunk) || 0,
      },
      safety: {
        airbags: parseInt(airbags) || 0,
        rating: parseInt(safetyRating) || 5,
      },
    },

    // 평점 (초기값 0)
    ratingOverall: 0,
    ratingDesign: 0,
    ratingPerformance: 0,
    ratingFuel: 0,
    ratingComfort: 0,
    reviewCount: 0,

    // 장단점 (| 구분자로 분리)
    pros: pros
      ? pros
          .split("|")
          .map((p) => p.trim())
          .filter(Boolean)
      : [],
    cons: cons
      ? cons
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean)
      : [],

    // 이미지
    imageMain: imageMain || "/images/cars/placeholder.jpg",
    images: imageMain ? [imageMain] : [],

    // 메타
    views: 0,
    favorites: 0,
    isFeatured: false,
    isElectric: fuelType === "전기",
    isNew: true,
  };
}

/**
 * 간단한 데이터 검증
 * @param {Object} car - 차량 객체
 * @returns {boolean} 유효성 여부
 */
// eslint-disable-next-line no-unused-vars
function validateCar(car) {
  return !!(
    car.brand &&
    car.model &&
    car.priceNew > 0 &&
    car.fuelType &&
    car.carType
  );
}
