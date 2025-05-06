import React, { useRef, useState } from 'react';

function InputFocus() {
  const inputRef = useRef(null);
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setPreviousValue(currentValue);
    setCurrentValue(e.target.value);
  };

  return (
    <div className="input-focus">
      <h2>Управление фокусом input</h2>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleChange}
          placeholder="Введите текст..."
        />
        <button onClick={handleFocus}>
          Установить фокус
        </button>
      </div>
      <div className="values-container">
        <p>Текущее значение: <strong>{currentValue}</strong></p>
        <p>Предыдущее значение: <strong>{previousValue}</strong></p>
      </div>
    </div>
  );
}

export default InputFocus; 