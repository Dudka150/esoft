import React, { createContext, useContext, useReducer, useMemo, useCallback, useState } from 'react';

const FilterContext = createContext();

const initialState = {
  tasks: [
    { id: 1, text: 'Изучить React', completed: true },
    { id: 2, text: 'Изучить Redux', completed: false },
    { id: 3, text: 'Создать проект', completed: false },
  ]
};


const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
}


const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggle(task.id)} className="task-text">
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        Удалить
      </button>
    </li>
  );
});


const TaskList = React.memo(({ tasks, onToggle, onDelete }) => {
  console.log('TaskList render');
  return (
    <ul className="tasks">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

function TaskManager() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');


  const handleAddTask = useCallback((e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: newTask.trim() });
      setNewTask('');
    }
  }, [newTask]);

  const handleToggleTask = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });
  }, []);

  const handleDeleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  }, []);

  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks...');
    return state.tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    });
  }, [state.tasks, filter]);


  const contextValue = useMemo(() => ({
    filter,
    setFilter
  }), [filter]);

  return (
    <FilterContext.Provider value={contextValue}>
      <div className="task-manager">
        <h2>Управление задачами</h2>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Добавить новую задачу..."
          />
          <button type="submit">Добавить</button>
        </form>
        <FilterControls />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </FilterContext.Provider>
  );
}


function FilterControls() {
  const { filter, setFilter } = useContext(FilterContext);
  
  return (
    <div className="filter-controls">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        Все
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => setFilter('active')}
      >
        Активные
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Завершенные
      </button>
    </div>
  );
}

export default TaskManager; 