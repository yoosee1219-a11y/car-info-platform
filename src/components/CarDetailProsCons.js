/**
 * 차량 장단점 컴포넌트
 * 장점과 단점을 구분하여 표시
 */

import React from "react";

/**
 * 차량 장단점 컴포넌트
 * @param {Object} car - 차량 정보
 */
function CarDetailProsCons({ car }) {
  if (!car) return null;

  const pros = car.pros || [];
  const cons = car.cons || [];

  return (
    <div className="pros-cons-section">
      <h2>장단점</h2>

      <div className="pros-cons-grid">
        {pros.length > 0 && (
          <div className="pros">
            <h3>👍 장점</h3>
            <ul>
              {pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
        )}

        {cons.length > 0 && (
          <div className="cons">
            <h3>👎 단점</h3>
            <ul>
              {cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {pros.length === 0 && cons.length === 0 && (
        <div className="no-pros-cons">
          <p>장단점 정보가 아직 등록되지 않았습니다.</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(CarDetailProsCons);
