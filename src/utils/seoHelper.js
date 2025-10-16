/**
 * SEO 헬퍼 유틸리티
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
    description: `${car.brand} ${car.model} ${car.year}년형 ${car.fuelType} ${car.carType} 정보`,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.ratingOverall || 0,
      reviewCount: car.reviewCount || 0,
      bestRating: 5,
      worstRating: 1,
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
 * 메타데이터 동적 설정
 * @param {Object} meta - 메타데이터 객체
 */
export function setDynamicMeta(meta) {
  // 제목 설정
  if (meta.title) {
    document.title = meta.title;
  }

  // 메타 설명 설정
  if (meta.description) {
    setMetaContent("description", meta.description);
  }

  // Open Graph 설정
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

  // Twitter Card 설정
  if (meta.twitterTitle) {
    setMetaName("twitter:title", meta.twitterTitle);
  }
  if (meta.twitterDescription) {
    setMetaName("twitter:description", meta.twitterDescription);
  }
  if (meta.twitterImage) {
    setMetaName("twitter:image", meta.twitterImage);
  }

  // 캐노니컬 URL 설정
  if (meta.canonical) {
    setCanonicalUrl(meta.canonical);
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
