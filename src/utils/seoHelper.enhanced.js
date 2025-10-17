/**
 * SEO 헬퍼 유틸리티 (네이버 최적화 버전)
 * 동적 메타데이터 및 구조화된 데이터 생성
 * 
 * 🎯 네이버 검색 최적화:
 * - 네이버 전용 메타태그
 * - GEO 정보 (지역 검색)
 * - 시간 정보 (Freshness)
 * - 풍부한 구조화된 데이터
 */

/**
 * 차량 상세 페이지용 구조화된 데이터 생성 (네이버 최적화)
 * @param {Object} car - 차량 정보 객체
 * @param {Object} location - 지역 정보 (선택사항)
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generateCarStructuredData(car, location = null) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.model} ${car.trim || ""}`.trim(),
    description: `${car.brand} ${car.model} ${car.year}년형 ${car.fuelType} ${car.carType} 정보. 렌터카/리스 견적 비교 및 상담 신청`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    category: car.carType,
    fuelType: car.fuelType,
    vehicleEngine: {
      "@type": "EngineSpecification",
      fuelType: car.fuelType,
      engineDisplacement: {
        "@type": "QuantitativeValue",
        value: car.displacement,
        unitCode: "CMQ",
      },
    },
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.fuelEfficiency,
      unitCode: car.fuelType === "전기" ? "KMT" : "KML",
    },
    offers: [
      {
        "@type": "Offer",
        name: "신차 가격",
        price: car.priceNew,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "카인포",
        },
      },
      {
        "@type": "Offer",
        name: "렌터카 월납입금",
        price: car.priceRentalMonthly,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "카인포",
        },
      },
      {
        "@type": "Offer",
        name: "리스 월납입금",
        price: car.priceLeaseMonthly,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "카인포",
        },
      },
    ],
    image: car.imageMain ? [car.imageMain] : [],
    url: `https://carinfo.co.kr/car/${car.slug}`,
    // 🎯 네이버 최적화: 평점 정보 (리치 스니펫)
    aggregateRating: car.ratingOverall
      ? {
          "@type": "AggregateRating",
          ratingValue: car.ratingOverall || 4.5,
          reviewCount: car.reviewCount || 100,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,

    // 🎯 네이버 최적화: 지역 정보 (GEO 검색)
    contentLocation: location
      ? {
          "@type": "Place",
          name: location.name || "서울",
          address: {
            "@type": "PostalAddress",
            addressLocality: location.city || "서울",
            addressRegion: location.region || "강남구",
            addressCountry: "KR",
          },
          geo: location.coordinates
            ? {
                "@type": "GeoCoordinates",
                latitude: location.coordinates.lat || 37.5665,
                longitude: location.coordinates.lng || 126.978,
              }
            : undefined,
        }
      : {
          "@type": "Place",
          name: "전국",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KR",
          },
        },
  };

  // undefined 필드 제거
  return JSON.parse(JSON.stringify(structuredData));
}

/**
 * 게시글용 구조화된 데이터 생성 (네이버 최적화)
 * @param {Object} post - 게시글 객체
 * @param {Object} location - 지역 정보 (선택사항)
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generatePostStructuredData(post, location = null) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary || post.content?.substring(0, 200),
    image: post.image ? [post.image] : [],
    author: {
      "@type": "Organization",
      name: "카인포",
      url: "https://carinfo.co.kr",
    },
    publisher: {
      "@type": "Organization",
      name: "카인포",
      logo: {
        "@type": "ImageObject",
        url: "https://carinfo.co.kr/logo192.png",
      },
    },
    // 🎯 네이버 최적화: 시간 정보 (Freshness)
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carinfo.co.kr/post/${post.id}`,
    },
    keywords: post.category,
    articleSection: post.category,
    wordCount: post.content ? post.content.length : 0,

    // 🎯 네이버 최적화: 지역 정보
    contentLocation: location
      ? {
          "@type": "Place",
          name: location.name || "서울",
          address: {
            "@type": "PostalAddress",
            addressLocality: location.city || "서울",
            addressRegion: location.region || "강남구",
            addressCountry: "KR",
          },
        }
      : undefined,
  };

  return JSON.parse(JSON.stringify(structuredData));
}

/**
 * 브레드크럼 구조화된 데이터 생성
 * @param {Array} breadcrumbs - 브레드크럼 배열
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ 구조화된 데이터 생성
 * @param {Array} faqs - FAQ 배열
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generateFAQStructuredData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 🎯 네이버 검색 최적화 메타데이터 설정
 * @param {Object} meta - 메타데이터 객체
 */
export function setNaverOptimizedMeta(meta) {
  // 기본 메타태그
  if (meta.title) {
    document.title = meta.title;
    setMetaName("naver:title", meta.title); // 🎯 네이버 전용
  }

  if (meta.description) {
    setMetaContent("description", meta.description);
    setMetaName("naver:description", meta.description); // 🎯 네이버 전용
  }

  // 🎯 네이버 최적화: 키워드
  if (meta.keywords) {
    setMetaName("keywords", meta.keywords);
  }

  // 🎯 네이버 최적화: 지역 정보 (GEO)
  if (meta.location) {
    // 지역 코드 (서울: KR-11, 부산: KR-26, 대구: KR-27, 인천: KR-28)
    if (meta.location.regionCode) {
      setMetaName("geo.region", meta.location.regionCode);
    }
    
    // 지역명
    if (meta.location.placename) {
      setMetaName("geo.placename", meta.location.placename);
    }
    
    // 좌표
    if (meta.location.position) {
      setMetaName("geo.position", meta.location.position); // 예: "37.5665;126.9780"
    }
  }

  // 🎯 네이버 최적화: 시간 정보 (Freshness)
  if (meta.publishedTime) {
    setMetaProperty("article:published_time", meta.publishedTime);
  }
  
  if (meta.modifiedTime) {
    setMetaProperty("article:modified_time", meta.modifiedTime);
  }

  // Open Graph
  if (meta.ogTitle) {
    setMetaProperty("og:title", meta.ogTitle);
  }
  if (meta.ogDescription) {
    setMetaProperty("og:description", meta.ogDescription);
  }
  if (meta.ogImage) {
    setMetaProperty("og:image", meta.ogImage);
  }
  if (meta.ogUrl) {
    setMetaProperty("og:url", meta.ogUrl);
  }
  setMetaProperty("og:type", meta.ogType || "website");
  setMetaProperty("og:locale", "ko_KR");

  // Twitter Card
  setMetaName("twitter:card", "summary_large_image");
  if (meta.twitterTitle) {
    setMetaName("twitter:title", meta.twitterTitle);
  }
  if (meta.twitterDescription) {
    setMetaName("twitter:description", meta.twitterDescription);
  }
  if (meta.twitterImage) {
    setMetaName("twitter:image", meta.twitterImage);
  }

  // 캐노니컬 URL
  if (meta.canonical) {
    setCanonicalUrl(meta.canonical);
  }

  // 🎯 네이버 최적화: 모바일 최적화
  setMetaName("viewport", "width=device-width, initial-scale=1.0");
  setMetaName("format-detection", "telephone=no");

  // 🎯 네이버 최적화: 로봇 설정
  setMetaName("robots", meta.robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
}

/**
 * 레거시 메타데이터 설정 (기존 호환성 유지)
 * @param {Object} meta - 메타데이터 객체
 */
export function setDynamicMeta(meta) {
  setNaverOptimizedMeta(meta);
}

/**
 * 메타 태그 content 속성 설정
 * @param {string} name - 메타 태그 name
 * @param {string} content - content 값
 */
function setMetaContent(name, content) {
  if (!content) return;
  
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * 메타 태그 property 속성 설정
 * @param {string} property - 메타 태그 property
 * @param {string} content - content 값
 */
function setMetaProperty(property, content) {
  if (!content) return;
  
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

