import React, { useState, useCallback } from 'react';

const RegularComponent = ({ count }) => {
  return (
    <div className="memo-component">
      <h3>Обычный компонент</h3>
      <p>Счетчик: {count}</p>
    </div>
  );
};

const MemoizedComponent = React.memo(({ count, onIncrement }) => {
  return (
    <div className="memo-component">
      <h3>Мемоизированный компонент</h3>
      <p>Счетчик: {count}</p>
      <button onClick={onIncrement}>Увеличить счетчик</button>
    </div>
  );
});

function MemoDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount2(prev => prev + 1);
  }, []);

  return (
    <div className="memo-demo">
      <h2>Демонстрация React.memo</h2>
      <div className="memo-controls">
        <button onClick={() => setCount1(prev => prev + 1)}>
          Изменить состояние родителя
        </button>
      </div>
      <div className="memo-components">
        <RegularComponent count={count1} />
        <MemoizedComponent count={count2} onIncrement={handleIncrement} />
      </div>
    </div>
  );
}

export default MemoDemo; 