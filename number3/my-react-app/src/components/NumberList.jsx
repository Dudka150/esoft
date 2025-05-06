import React, { useState, useMemo } from 'react';

function generateRandomArray(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
}

function NumberList() {
  const [numbers, setNumbers] = useState(() => generateRandomArray(10));

  const sum = useMemo(() => {
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  const generateNewArray = () => {
    setNumbers(generateRandomArray(10));
  };

  return (
    <div className="number-list">
      <h2>Список чисел</h2>
      <div className="numbers-container">
        {numbers.map((num, index) => (
          <span key={index} className="number-item">
            {num}
          </span>
        ))}
      </div>
      <div className="sum-container">
        <p>Сумма чисел: <strong>{sum}</strong></p>
      </div>
      <button onClick={generateNewArray}>
        Сгенерировать новый массив
      </button>
    </div>
  );
}

export default NumberList; 