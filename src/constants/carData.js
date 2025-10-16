/**
 * 차량 샘플 데이터
 * 실제 서비스에서는 Supabase나 API에서 가져오지만,
 * 프로토타입에서는 하드코딩된 데이터 사용
 */

export const SAMPLE_CARS = [
  // 현대 차량
  {
    id: "car-001",
    brand: "현대",
    model: "그랜저",
    trim: "캘리그라피",
    year: 2025,
    slug: "hyundai-grandeur-2025",

    // 가격
    priceNew: 48900000,
    priceRentalMonthly: 650000,
    priceLeaseMonthly: 580000,

    // 기본 정보
    fuelType: "가솔린",
    carType: "세단",
    displacement: 3470,
    fuelEfficiency: 11.2,

    // 재원 정보
    specs: {
      engine: {
        maxPower: 290,
        maxTorque: 36.2,
        transmission: "8단 자동",
      },
      dimension: {
        length: 4995,
        width: 1895,
        height: 1490,
        wheelbase: 2950,
      },
      capacity: {
        seats: 5,
        trunk: 480,
      },
      safety: {
        airbags: 9,
        rating: 5,
      },
    },

    // 평점
    ratingOverall: 4.5,
    ratingDesign: 4.7,
    ratingPerformance: 4.3,
    ratingFuel: 4.1,
    ratingComfort: 4.8,
    reviewCount: 124,

    // 장단점
    pros: [
      "넓은 실내 공간",
      "우수한 승차감",
      "고급스러운 디자인",
      "풍부한 안전 사양",
      "조용한 실내",
    ],
    cons: ["높은 초기 비용", "무거운 차체", "낮은 연비", "큰 회전 반경"],

    // 이미지
    imageMain: "/images/cars/hyundai-grandeur.jpg",
    images: [
      "/images/cars/hyundai-grandeur.jpg",
      "/images/cars/hyundai-grandeur-side.jpg",
      "/images/cars/hyundai-grandeur-interior.jpg",
      "/images/cars/hyundai-grandeur-trunk.jpg",
    ],

    // 메타
    views: 1523,
    favorites: 89,
    isFeatured: true,
    isElectric: false,
    isNew: true,
  },

  {
    id: "car-002",
    brand: "기아",
    model: "K8",
    trim: "시그니처",
    year: 2025,
    slug: "kia-k8-2025",

    priceNew: 46200000,
    priceRentalMonthly: 620000,
    priceLeaseMonthly: 550000,

    fuelType: "가솔린",
    carType: "세단",
    displacement: 3470,
    fuelEfficiency: 11.5,

    specs: {
      engine: {
        maxPower: 290,
        maxTorque: 36.2,
        transmission: "8단 자동",
      },
      dimension: {
        length: 4995,
        width: 1895,
        height: 1465,
      },
      capacity: {
        seats: 5,
        trunk: 453,
      },
      safety: {
        airbags: 9,
        rating: 5,
      },
    },

    ratingOverall: 4.7,
    ratingDesign: 4.9,
    ratingPerformance: 4.5,
    ratingFuel: 4.3,
    ratingComfort: 4.7,
    reviewCount: 89,

    pros: [
      "세련된 디자인",
      "높은 가성비",
      "우수한 주행 성능",
      "편리한 첨단 기능",
    ],
    cons: ["좁은 뒷좌석", "낮은 브랜드 인지도", "재판매가 하락"],

    imageMain: "/images/cars/kia-k8.jpg",
    images: ["/images/cars/kia-k8.jpg", "/images/cars/kia-k8-side.jpg"],

    views: 892,
    favorites: 67,
    isFeatured: true,
    isElectric: false,
    isNew: true,
  },

  {
    id: "car-003",
    brand: "제네시스",
    model: "G80",
    trim: "3.5 터보",
    year: 2025,
    slug: "genesis-g80-2025",

    priceNew: 67800000,
    priceRentalMonthly: 890000,
    priceLeaseMonthly: 820000,

    fuelType: "가솔린",
    carType: "세단",
    displacement: 3470,
    fuelEfficiency: 10.1,

    specs: {
      engine: {
        maxPower: 365,
        maxTorque: 53.0,
        transmission: "8단 자동",
      },
      dimension: {
        length: 5015,
        width: 1925,
        height: 1465,
      },
      capacity: {
        seats: 5,
        trunk: 424,
      },
      safety: {
        airbags: 10,
        rating: 5,
      },
    },

    ratingOverall: 4.8,
    ratingDesign: 5.0,
    ratingPerformance: 4.9,
    ratingFuel: 3.8,
    ratingComfort: 4.9,
    reviewCount: 156,

    pros: ["럭셔리한 디자인", "강력한 성능", "최상급 승차감", "풍부한 옵션"],
    cons: ["높은 가격", "낮은 연비", "무거운 차체"],

    imageMain: "/images/cars/genesis-g80.jpg",
    images: [
      "/images/cars/genesis-g80.jpg",
      "/images/cars/genesis-g80-side.jpg",
    ],

    views: 2104,
    favorites: 134,
    isFeatured: true,
    isElectric: false,
    isNew: true,
  },

  // SUV
  {
    id: "car-004",
    brand: "현대",
    model: "팰리세이드",
    trim: "캘리그라피",
    year: 2025,
    slug: "hyundai-palisade-2025",

    priceNew: 52900000,
    priceRentalMonthly: 720000,
    priceLeaseMonthly: 650000,

    fuelType: "디젤",
    carType: "SUV",
    displacement: 2151,
    fuelEfficiency: 12.3,

    specs: {
      engine: {
        maxPower: 202,
        maxTorque: 45.0,
        transmission: "8단 자동",
      },
      dimension: {
        length: 4995,
        width: 1975,
        height: 1750,
      },
      capacity: {
        seats: 7,
        trunk: 311,
      },
      safety: {
        airbags: 9,
        rating: 5,
      },
    },

    ratingOverall: 4.6,
    ratingDesign: 4.5,
    ratingPerformance: 4.4,
    ratingFuel: 4.2,
    ratingComfort: 4.8,
    reviewCount: 203,

    pros: ["넓은 3열 공간", "높은 안전성", "우수한 승차감", "다양한 편의 사양"],
    cons: ["큰 차체", "높은 연료비", "낮은 주차 편의성"],

    imageMain: "/images/cars/hyundai-palisade.jpg",
    images: ["/images/cars/hyundai-palisade.jpg"],

    views: 1876,
    favorites: 112,
    isFeatured: true,
    isElectric: false,
    isNew: true,
  },

  {
    id: "car-005",
    brand: "기아",
    model: "쏘렌토",
    trim: "시그니처",
    year: 2025,
    slug: "kia-sorento-2025",

    priceNew: 42300000,
    priceRentalMonthly: 580000,
    priceLeaseMonthly: 520000,

    fuelType: "하이브리드",
    carType: "SUV",
    displacement: 1598,
    fuelEfficiency: 14.2,

    specs: {
      engine: {
        maxPower: 230,
        maxTorque: 35.7,
        transmission: "6단 자동",
      },
      dimension: {
        length: 4810,
        width: 1900,
        height: 1700,
      },
      capacity: {
        seats: 7,
        trunk: 187,
      },
      safety: {
        airbags: 7,
        rating: 5,
      },
    },

    ratingOverall: 4.4,
    ratingDesign: 4.3,
    ratingPerformance: 4.2,
    ratingFuel: 4.6,
    ratingComfort: 4.5,
    reviewCount: 178,

    pros: [
      "우수한 연비",
      "합리적인 가격",
      "실용적인 공간",
      "하이브리드 시스템",
    ],
    cons: ["낮은 브랜드 가치", "평범한 디자인", "좁은 3열"],

    imageMain: "/images/cars/kia-sorento.jpg",
    images: ["/images/cars/kia-sorento.jpg"],

    views: 1340,
    favorites: 89,
    isFeatured: false,
    isElectric: false,
    isNew: true,
  },

  // 전기차
  {
    id: "car-006",
    brand: "현대",
    model: "아이오닉5",
    trim: "롱레인지",
    year: 2025,
    slug: "hyundai-ioniq5-2025",

    priceNew: 52000000,
    priceRentalMonthly: 680000,
    priceLeaseMonthly: 610000,

    fuelType: "전기",
    carType: "SUV",
    displacement: 0,
    fuelEfficiency: 5.2, // km/kWh

    specs: {
      engine: {
        maxPower: 325,
        maxTorque: 61.2,
        transmission: "1단 감속기",
      },
      dimension: {
        length: 4635,
        width: 1890,
        height: 1605,
      },
      capacity: {
        seats: 5,
        trunk: 527,
      },
      safety: {
        airbags: 7,
        rating: 5,
      },
    },

    ratingOverall: 4.7,
    ratingDesign: 4.9,
    ratingPerformance: 4.6,
    ratingFuel: 4.8,
    ratingComfort: 4.6,
    reviewCount: 267,

    pros: ["혁신적인 디자인", "빠른 충전 속도", "제로 배출", "낮은 유지비"],
    cons: ["높은 초기 비용", "충전 인프라 부족", "긴 충전 시간"],

    imageMain: "/images/cars/hyundai-ioniq5.jpg",
    images: ["/images/cars/hyundai-ioniq5.jpg"],

    views: 2890,
    favorites: 234,
    isFeatured: true,
    isElectric: true,
    isNew: true,
  },

  {
    id: "car-007",
    brand: "기아",
    model: "EV6",
    trim: "GT-Line",
    year: 2025,
    slug: "kia-ev6-2025",

    priceNew: 54800000,
    priceRentalMonthly: 720000,
    priceLeaseMonthly: 650000,

    fuelType: "전기",
    carType: "SUV",
    displacement: 0,
    fuelEfficiency: 5.0,

    specs: {
      engine: {
        maxPower: 325,
        maxTorque: 61.2,
        transmission: "1단 감속기",
      },
      dimension: {
        length: 4680,
        width: 1880,
        height: 1550,
      },
      capacity: {
        seats: 5,
        trunk: 490,
      },
      safety: {
        airbags: 7,
        rating: 5,
      },
    },

    ratingOverall: 4.8,
    ratingDesign: 5.0,
    ratingPerformance: 4.9,
    ratingFuel: 4.7,
    ratingComfort: 4.6,
    reviewCount: 298,

    pros: ["스포티한 디자인", "뛰어난 성능", "초고속 충전", "넓은 실내"],
    cons: ["높은 가격", "딱딱한 승차감", "제한된 색상"],

    imageMain: "/images/cars/kia-ev6.jpg",
    images: ["/images/cars/kia-ev6.jpg"],

    views: 3204,
    favorites: 287,
    isFeatured: true,
    isElectric: true,
    isNew: true,
  },

  // 수입차
  {
    id: "car-008",
    brand: "벤츠",
    model: "E-Class",
    trim: "E300 4MATIC",
    year: 2025,
    slug: "mercedes-e-class-2025",

    priceNew: 78900000,
    priceRentalMonthly: 1050000,
    priceLeaseMonthly: 950000,

    fuelType: "가솔린",
    carType: "세단",
    displacement: 1991,
    fuelEfficiency: 11.5,

    specs: {
      engine: {
        maxPower: 258,
        maxTorque: 40.8,
        transmission: "9단 자동",
      },
      dimension: {
        length: 4949,
        width: 1880,
        height: 1468,
      },
      capacity: {
        seats: 5,
        trunk: 540,
      },
      safety: {
        airbags: 9,
        rating: 5,
      },
    },

    ratingOverall: 4.9,
    ratingDesign: 5.0,
    ratingPerformance: 4.8,
    ratingFuel: 4.5,
    ratingComfort: 5.0,
    reviewCount: 145,

    pros: ["최고급 품질", "탁월한 승차감", "높은 브랜드 가치", "첨단 기술"],
    cons: ["매우 높은 가격", "높은 유지비", "복잡한 인터페이스"],

    imageMain: "/images/cars/mercedes-eclass.jpg",
    images: ["/images/cars/mercedes-eclass.jpg"],

    views: 1567,
    favorites: 178,
    isFeatured: false,
    isElectric: false,
    isNew: true,
  },

  {
    id: "car-009",
    brand: "BMW",
    model: "5시리즈",
    trim: "520i M Sport",
    year: 2025,
    slug: "bmw-5-series-2025",

    priceNew: 72300000,
    priceRentalMonthly: 980000,
    priceLeaseMonthly: 880000,

    fuelType: "가솔린",
    carType: "세단",
    displacement: 1998,
    fuelEfficiency: 12.1,

    specs: {
      engine: {
        maxPower: 184,
        maxTorque: 30.6,
        transmission: "8단 자동",
      },
      dimension: {
        length: 4963,
        width: 1868,
        height: 1479,
      },
      capacity: {
        seats: 5,
        trunk: 530,
      },
      safety: {
        airbags: 8,
        rating: 5,
      },
    },

    ratingOverall: 4.7,
    ratingDesign: 4.8,
    ratingPerformance: 4.9,
    ratingFuel: 4.4,
    ratingComfort: 4.7,
    reviewCount: 132,

    pros: [
      "뛰어난 주행 성능",
      "스포티한 디자인",
      "정교한 핸들링",
      "높은 브랜드 가치",
    ],
    cons: ["높은 가격", "딱딱한 승차감", "비싼 옵션"],

    imageMain: "/images/cars/bmw-5series.jpg",
    images: ["/images/cars/bmw-5series.jpg"],

    views: 1432,
    favorites: 156,
    isFeatured: false,
    isElectric: false,
    isNew: true,
  },

  {
    id: "car-010",
    brand: "테슬라",
    model: "Model 3",
    trim: "Long Range",
    year: 2025,
    slug: "tesla-model3-2025",

    priceNew: 59900000,
    priceRentalMonthly: 780000,
    priceLeaseMonthly: 700000,

    fuelType: "전기",
    carType: "세단",
    displacement: 0,
    fuelEfficiency: 5.8,

    specs: {
      engine: {
        maxPower: 366,
        maxTorque: 51.0,
        transmission: "1단 감속기",
      },
      dimension: {
        length: 4720,
        width: 1850,
        height: 1440,
      },
      capacity: {
        seats: 5,
        trunk: 561,
      },
      safety: {
        airbags: 8,
        rating: 5,
      },
    },

    ratingOverall: 4.6,
    ratingDesign: 4.5,
    ratingPerformance: 4.8,
    ratingFuel: 4.7,
    ratingComfort: 4.4,
    reviewCount: 412,

    pros: ["강력한 성능", "오토파일럿", "낮은 유지비", "넓은 실내"],
    cons: ["딱딱한 승차감", "높은 AS 비용", "품질 편차", "미니멀한 내장"],

    imageMain: "/images/cars/tesla-model3.jpg",
    images: ["/images/cars/tesla-model3.jpg"],

    views: 3567,
    favorites: 298,
    isFeatured: true,
    isElectric: true,
    isNew: true,
  },
];

// 필터 옵션용 상수
export const FILTER_OPTIONS = {
  brands: ["전체", "현대", "기아", "제네시스", "벤츠", "BMW", "테슬라"],
  carTypes: ["전체", "세단", "SUV", "쿠페", "전기차"],
  fuelTypes: ["전체", "가솔린", "디젤", "하이브리드", "전기"],
  priceRanges: [
    { label: "전체", min: 0, max: Infinity },
    { label: "3천만원 이하", min: 0, max: 30000000 },
    { label: "3천~5천만원", min: 30000000, max: 50000000 },
    { label: "5천~7천만원", min: 50000000, max: 70000000 },
    { label: "7천만원 이상", min: 70000000, max: Infinity },
  ],
  sortOptions: [
    { value: "popular", label: "인기순" },
    { value: "price-asc", label: "가격 낮은순" },
    { value: "price-desc", label: "가격 높은순" },
    { value: "rating", label: "평점 높은순" },
    { value: "recent", label: "최신순" },
  ],
};
