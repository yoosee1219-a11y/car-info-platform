/**
 * SEO 헬퍼 유틸리티 (네이버, 다음, 구글 최적화)
 * 동적 메타데이터 및 구조화된 데이터 생성
 */

/**
 * 차량 상세 페이지용 구조화된 데이터 생성
 * @param {Object} car - 차량 정보 객체
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generateCarStructuredData(car) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.model} ${car.trim || ""}`.trim(),
    description: `${car.brand} ${car.model} ${car.year}년형 ${car.fuelType} ${car.carType} 정보. 신차 가격, 렌터카 리스 비용 비교`,
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
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
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
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
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
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    ],
    image: car.imageMain ? [car.imageMain] : [],
    url: `https://carinfo.co.kr/car/${car.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.ratingOverall || 4.5,
      reviewCount: car.reviewCount || 10,
      bestRating: 5,
      worstRating: 1,
    },
    // 추가: 상세 정보
    productionDate: car.year ? `${car.year}-01-01` : undefined,
    itemCondition: "https://schema.org/NewCondition",
    // 추가: 위치 정보
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KR",
        addressRegion: "서울",
      },
    },
  };
}

/**
 * 게시글용 구조화된 데이터 생성
 * @param {Object} post - 게시글 객체
 * @returns {Object} JSON-LD 구조화된 데이터
 */
export function generatePostStructuredData(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.image ? [post.image] : [],
    author: {
      "@type": "Organization",
      name: "카인포",
    },
    publisher: {
      "@type": "Organization",
      name: "카인포",
      logo: {
        "@type": "ImageObject",
        url: "https://carinfo.co.kr/logo192.png",
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carinfo.co.kr/post/${post.id}`,
    },
    keywords: post.category,
    articleSection: post.category,
    wordCount: post.content ? post.content.length : 0,
    // 추가: 게시글 위치
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KR",
        addressRegion: "서울",
      },
    },
  };
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
 * 메타데이터 동적 설정 (네이버, 다음, 구글 최적화)
 * @param {Object} meta - 메타데이터 객체
 */
export function setDynamicMeta(meta) {
  // 제목 설정
  if (meta.title) {
    document.title = meta.title;
  }

  // 기본 메타 설명 설정
  if (meta.description) {
    setMetaContent("description", meta.description);
  }

  // 키워드 설정 (네이버 중요)
  if (meta.keywords) {
    setMetaContent("keywords", meta.keywords);
  }

  // 작성자 정보
  if (meta.author) {
    setMetaContent("author", meta.author);
  }

  // 날짜 정보 (콘텐츠 신선도)
  if (meta.datePublished) {
    setMetaContent("article:published_time", meta.datePublished);
  }
  if (meta.dateModified) {
    setMetaContent("article:modified_time", meta.dateModified);
  }

  // 연령 제한 정보 (네이버 중요)
  setMetaContent("rating", meta.rating || "General"); // General, Adult 등

  // GEO 정보 (지역 검색 최적화)
  if (meta.geo) {
    setMetaContent("geo.region", meta.geo.region || "KR-11"); // 서울
    setMetaContent("geo.placename", meta.geo.placename || "서울");
    if (meta.geo.position) {
      setMetaContent("geo.position", meta.geo.position); // 위도;경도
      setMetaContent("ICBM", meta.geo.position); // 다음 검색용
    }
  }

  // 네이버 전용 메타태그
  if (meta.naverSiteVerification) {
    setMetaContent(
      "naver-site-verification",
      meta.naverSiteVerification
    );
  }
  setMetaContent("NaverBot", meta.robotsPolicy || "All");

  // 다음(Daum) 전용
  setMetaContent("Daumoa", meta.robotsPolicy || "All");

  // Open Graph 설정 (필수 + 추가)
  setMetaProperty("og:type", meta.ogType || "website");
  setMetaProperty("og:site_name", "카인포");
  setMetaProperty("og:locale", "ko_KR");

  if (meta.ogTitle) {
    setMetaProperty("og:title", meta.ogTitle);
  }
  if (meta.ogDescription) {
    setMetaProperty("og:description", meta.ogDescription);
  }
  if (meta.ogImage) {
    setMetaProperty("og:image", meta.ogImage);
    setMetaProperty("og:image:width", "1200");
    setMetaProperty("og:image:height", "630");
    setMetaProperty("og:image:alt", meta.ogTitle || "카인포 이미지");
  }
  if (meta.ogUrl) {
    setMetaProperty("og:url", meta.ogUrl);
  }

  // Twitter Card 설정
  setMetaName("twitter:card", meta.twitterCard || "summary_large_image");
  if (meta.twitterTitle) {
    setMetaName("twitter:title", meta.twitterTitle);
  }
  if (meta.twitterDescription) {
    setMetaName("twitter:description", meta.twitterDescription);
  }
  if (meta.twitterImage) {
    setMetaName("twitter:image", meta.twitterImage);
  }

  // 모바일 최적화
  setMetaName("viewport", "width=device-width, initial-scale=1.0");
  setMetaName("format-detection", "telephone=no");

  // 캐노니컬 URL 설정
  if (meta.canonical) {
    setCanonicalUrl(meta.canonical);
  }

  // 대체 언어 버전 (다국어 지원 시)
  if (meta.alternateLanguages) {
    meta.alternateLanguages.forEach((alt) => {
      setAlternateLanguage(alt.hreflang, alt.href);
    });
  }
}

/**
 * 메타 태그 content 속성 설정
 * @param {string} name - 메타 태그 name
 * @param {string} content - content 값
 */
function setMetaContent(name, content) {
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
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * 메타 태그 name 속성 설정
 * @param {string} name - 메타 태그 name
 * @param {string} content - content 값
 */
function setMetaName(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * 캐노니컬 URL 설정
 * @param {string} url - 캐노니컬 URL
 */
function setCanonicalUrl(url) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

/**
 * 대체 언어 버전 설정
 * @param {string} hreflang - 언어 코드
 * @param {string} href - URL
 */
function setAlternateLanguage(hreflang, href) {
  let alternate = document.querySelector(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );
  if (!alternate) {
    alternate = document.createElement("link");
    alternate.setAttribute("rel", "alternate");
    alternate.setAttribute("hreflang", hreflang);
    document.head.appendChild(alternate);
  }
  alternate.setAttribute("href", href);
}

/**
 * 구조화된 데이터를 head에 추가
 * @param {Object} structuredData - 구조화된 데이터 객체
 * @param {string} id - 스크립트 태그 ID
 */
export function addStructuredData(structuredData, id = "structured-data") {
  // 기존 구조화된 데이터 제거
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }

  // 새로운 구조화된 데이터 추가
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(structuredData, null, 2);
  document.head.appendChild(script);
}

/**
 * SEO 최적화를 위한 기본 설정값 제공
 * @returns {Object} 기본 SEO 설정
 */
export function getDefaultSEOConfig() {
  return {
    siteName: "카인포",
    siteUrl: "https://carinfo.co.kr",
    author: "카인포 팀",
    rating: "General",
    geo: {
      region: "KR-11",
      placename: "서울",
      position: "37.5665;126.9780", // 서울 좌표
    },
    robotsPolicy: "All",
    ogType: "website",
    twitterCard: "summary_large_image",
  };
}
