/**
 * 차량 스펙 테이블 컴포넌트
 * 상세 스펙 정보를 테이블 형태로 표시
 */

import React from "react";

/**
 * 차량 스펙 테이블 컴포넌트
 * @param {Object} car - 차량 정보
 * @param {Function} formatPrice - 가격 포맷팅 함수
 * @param {Function} formatFuelEfficiency - 연비 포맷팅 함수
 */
function CarDetailSpecs({ car, formatPrice, formatFuelEfficiency }) {
  if (!car) return null;

  const specs = [
    { label: "제조사", value: car.brand },
    { label: "모델", value: car.model },
    { label: "트림", value: car.trim || "-" },
    { label: "연식", value: `${car.year}년형` },
    { label: "차종", value: car.segment || "-" },
    { label: "연료", value: car.fuelType },
    {
      label: "배기량",
      value: car.displacement ? `${car.displacement}cc` : "-",
    },
    { label: "출력", value: car.power ? `${car.power}ps` : "-" },
    { label: "토크", value: car.torque ? `${car.torque}kgf·m` : "-" },
    { label: "연비", value: formatFuelEfficiency(car.fuelEfficiency) },
    { label: "변속기", value: car.transmission || "-" },
    { label: "구동방식", value: car.drivetrain || "-" },
    { label: "승차정원", value: car.seating ? `${car.seating}명` : "-" },
    { label: "문 수", value: car.doors ? `${car.doors}도어` : "-" },
    { label: "전장", value: car.length ? `${car.length}mm` : "-" },
    { label: "전폭", value: car.width ? `${car.width}mm` : "-" },
    { label: "전고", value: car.height ? `${car.height}mm` : "-" },
    { label: "축거", value: car.wheelbase ? `${car.wheelbase}mm` : "-" },
    { label: "공차중량", value: car.weight ? `${car.weight}kg` : "-" },
  ];

  return (
    <div className="specs-section">
      <h2>상세 스펙</h2>
      <div className="specs-table">
        <table>
          <tbody>
            {specs.map((spec, index) => (
              <tr key={index}>
                <td className="spec-label">{spec.label}</td>
                <td className="spec-value">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(CarDetailSpecs);
