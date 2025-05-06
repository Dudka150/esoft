import React, { useState, useCallback } from 'react';

const ListItem = React.memo(({ value }) => {
  return <li>Элемент {value}</li>;
});

function CounterList() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
    setItems(prev => [...prev, prev.length + 1]);
  }, []);

  const decrement = useCallback(() => {
    if (count > 0) {
      setCount(prev => prev - 1);
      setItems(prev => prev.slice(0, -1));
    }
  }, [count]);

  return (
    <div className="counter-list">
      <h2>Счетчик: {count}</h2>
      <div className="buttons">
        <button onClick={increment}>Добавить</button>
        <button onClick={decrement}>Удалить</button>
      </div>
      <ul>
        {items.map((item) => (
          <ListItem key={item} value={item} />
        ))}
      </ul>
    </div>
  );
}

export default CounterList;
