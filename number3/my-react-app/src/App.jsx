import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeContext } from './components/ThemeContext';
import { useContext } from 'react';
import CounterList from './components/CounterList';
import NumberList from './components/NumberList';
import InputFocus from './components/InputFocus';
import TodoList from './components/TodoList';
import MemoDemo from './components/MemoDemo';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>ДЗ№3</h1>
        <button onClick={toggleTheme}>
          Переключить на {theme === 'light' ? 'Темную' : 'Светлую'} тему
        </button>
      </header>
      <main>
        <p>
          Тема <strong>{theme}</strong>.
        </p>
        <CounterList />
        <NumberList />
        <InputFocus />
        <TodoList />
        <MemoDemo />
      </main>
    </div>
  );
}

export default App
